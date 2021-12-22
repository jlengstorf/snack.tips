import { Outlet, useLoaderData, useNavigate, useParams } from 'remix';
import type { LoaderFunction } from 'remix';
import { useEffect } from 'react';
import mapboxgl, { Map, MapboxGeoJSONFeature } from 'mapbox-gl';

import mapboxStyles from 'mapbox-gl/dist/mapbox-gl.css';
import styles from '~/styles/city.css';

export function meta() {
  return {
    title: 'Snack Tips',
  };
}

export async function getAllPlaces(city: string) {
  const res = await fetch(
    // `http://localhost:3000/api/places?city=${city}`,
    `https://snack.tips/api/places?city=${city}`,
  );

  if (!res.ok) {
    throw new Error('Error loading places');
  }

  return await res.json();
}

export async function getPlace(city: string, slug: string) {
  const places = await getAllPlaces(city);

  return places.data.features.find(
    (l: MapboxGeoJSONFeature) => l?.properties?.slug === slug,
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const { city } = params;

  if (!city) {
    throw new Error('no city found!');
  }

  const places = await getAllPlaces(city);

  return { places, token: process.env.MAPBOX_ACCESS_TOKEN };
};

export function links() {
  return [
    { rel: 'stylesheet', href: mapboxStyles },
    { rel: 'stylesheet', href: styles },
  ];
}

let map: Map;
let activeMarkerId: string | number | undefined;

export default function City() {
  let navigate = useNavigate();
  const { city, place } = useParams();
  const { places, token } = useLoaderData();

  function updateActiveMarker(place?: MapboxGeoJSONFeature) {
    if (!map) {
      return;
    }

    if (activeMarkerId !== undefined) {
      map.setFeatureState(
        { source: 'places', id: activeMarkerId },
        { active: false },
      );
    }

    if (!place) {
      return;
    }

    activeMarkerId = place?.id;
    map.setFeatureState(
      { source: 'places', id: activeMarkerId },
      { active: true },
    );
  }

  useEffect(() => {
    if (map) {
      return;
    }

    mapboxgl.accessToken = token;

    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-122.6784, 45.5152],
      zoom: 11.25,
    });

    map.on('load', () => {
      map.addSource('places', places);

      map.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        layout: {
          'circle-sort-key': 1,
        },
        paint: {
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            '#ca00ca',
            '#eb77eb',
          ],
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            6,
            4,
          ],
        },
      });

      if (place) {
        const currentPlace = places.data.features.find(
          (l: MapboxGeoJSONFeature) => l?.properties?.slug === place,
        );

        if (currentPlace) {
          updateActiveMarker(currentPlace);

          map.flyTo({
            center: currentPlace?.geometry?.coordinates,
            zoom: 14,
          });
        }
      }

      map.on('click', 'places', (e) => {
        const place = e?.features?.[0];

        if (!place) {
          return;
        }

        updateActiveMarker(place);

        navigate(`/${city}/${place?.properties?.slug}`);

        map.flyTo({
          center: place?.geometry?.coordinates,
          zoom: 14,
        });
      });

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });
    });
  }, []);

  function resetMapPosition(event: MouseEvent) {
    event.preventDefault();

    map.flyTo({
      center: [-122.6784, 45.5152],
      zoom: 11.25,
    });

    updateActiveMarker();

    navigate(`/${city}`);
  }

  return (
    <main>
      <div id="map" className="map"></div>

      <div className="map-grid">
        <section className="place-details">
          <Outlet context={resetMapPosition} />
        </section>

        <aside className="place-nav">
          {places.data.features.map((l: MapboxGeoJSONFeature) => {
            if (!l.properties) {
              return null;
            }

            function handleClick(event: MouseEvent) {
              event.preventDefault();
              map.flyTo({
                center: l.geometry.coordinates,
                zoom: 14,
              });
              updateActiveMarker(l);
              navigate(`/${l?.properties?.city}/${l?.properties?.slug}`);
            }

            return (
              <a
                key={l.properties.slug}
                className="link"
                onClick={handleClick}
                href={`/${l.properties.city}/${l.properties.slug}`}
              >
                {l.properties.name}
              </a>
            );
          })}
        </aside>
      </div>
    </main>
  );
}

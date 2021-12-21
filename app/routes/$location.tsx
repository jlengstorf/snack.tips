import { Outlet, useLoaderData, useNavigate, useParams } from 'remix';
import type { LoaderFunction } from 'remix';
import { useEffect } from 'react';
import mapboxgl, { Map, MapboxGeoJSONFeature } from 'mapbox-gl';

import mapboxStyles from 'mapbox-gl/dist/mapbox-gl.css';
import styles from '~/styles/locations.css';

export function meta() {
  return {
    title: 'Snack Tips',
  };
}

export async function getAllLocations(city: string) {
  const res = await fetch(
    `https://snack-tips.netlify.app/api/locations?city=${city}`,
  );

  if (!res.ok) {
    throw new Error('Error loading locations');
  }

  const features = await res.json();

  return {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features,
    },
  };
}

export async function getLocation(city: string, slug: string) {
  const locations = await getAllLocations(city);

  return locations.data.features.find(
    (l: MapboxGeoJSONFeature) => l?.properties?.slug === slug,
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const { location } = params;

  if (!location) {
    throw new Error('no location found!');
  }

  const locations = await getAllLocations(location);

  return { locations, token: process.env.MAPBOX_ACCESS_TOKEN };
};

export function links() {
  return [
    { rel: 'stylesheet', href: mapboxStyles },
    { rel: 'stylesheet', href: styles },
  ];
}

let map: Map;
let activeMarkerId: string | number | undefined;

export default function Location() {
  let navigate = useNavigate();
  const { location } = useParams();
  const { locations, token } = useLoaderData();

  function updateActiveMarker(place: MapboxGeoJSONFeature) {
    if (!map) {
      return;
    }

    if (activeMarkerId !== undefined) {
      map.setFeatureState(
        { source: 'places', id: activeMarkerId },
        { active: false },
      );
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
      map.addSource('places', locations);

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
            '#eb00eb',
            '#eb77eb',
          ],
          'circle-radius': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            6,
            4,
          ],
          // 'circle-stroke-width': 1,
          // 'circle-stroke-color': '#ffffff',
        },
      });

      map.on('click', 'places', (e) => {
        const place = e?.features?.[0];

        if (!place) {
          return;
        }

        updateActiveMarker(place);

        navigate(`/${location}/${place?.properties?.slug}`);

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

  return (
    <main>
      <div id="map" className="map"></div>

      <div className="map-grid">
        <section className="location-details">
          <Outlet />
        </section>

        <aside className="location-nav">
          {locations.data.features.map((l: MapboxGeoJSONFeature) => {
            if (!l.properties) {
              return null;
            }

            function handleClick(event) {
              event.preventDefault();
              map.flyTo({
                center: l.geometry.coordinates,
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

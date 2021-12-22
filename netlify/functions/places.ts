import { Handler, builder } from '@netlify/functions';
import fetch from 'node-fetch';

export const handler: Handler = builder(async () => {
  const response = await fetch(
    'https://3bbpgel8.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query LoadAllPlaces {
            allPlace {
              _id
              name
              slug {
                current
              }
              city {
                name
                slug {
                  current
                }
              }
              location {
                lng
                lat
              }
              address
              url
              note
            }
          }
        `,
        variables: {},
      }),
    },
  );

  if (!response.ok) {
    console.error(response);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'unable to load places' }),
    };
  }

  const { data } = await response.json();

  const features = data.allPlace.map((place, index: number) => ({
    type: 'Feature',
    id: index + 1, // Mapbox requires a numerical ID
    geometry: {
      type: 'Point',
      coordinates: [place.location.lng, place.location.lat],
    },
    properties: {
      city: place.city.slug.current,
      name: place.name,
      slug: place.slug,
      note: place.note,
      url: place.url,
      address: place.address,
    },
  }));

  const geoJSON = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features,
    },
  };

  return {
    statusCode: 200,
    body: JSON.stringify(geoJSON),
  };
});

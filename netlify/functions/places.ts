import { Handler, builder } from '@netlify/functions';
import fetch from 'node-fetch';

type SanityPlaceResponse = {
  name: string;
  slug: {
    current: string;
  };
  note: string;
  url: string;
  address: string;
  location: {
    lng: number;
    lat: number;
  };
  city: {
    slug: {
      current: string;
    };
  };
};

type FetchResult = {
  data?: {
    allPlace: SanityPlaceResponse[];
  };
  errors?: Array<{ message: string }>;
};

export const handler: Handler = builder(async (event) => {
  const params = event.queryStringParameters;
  const city = params?.city || 'portland';

  const response = await fetch(
    'https://3bbpgel8.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query LoadAllPlaces($city: String!) {
            allPlace(
              where: { city: { slug: { current: { eq: $city } } } },
              sort: { name: ASC }
            ) {
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
        variables: { city },
      }),
    },
  );

  const result = (await response.json()) as FetchResult;

  if (!response.ok || !result.data) {
    console.error(response);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'unable to load places' }),
    };
  }

  const features = result.data.allPlace.map(
    (place: SanityPlaceResponse, index: number) => ({
      type: 'Feature',
      id: index + 1, // Mapbox requires a numerical ID
      geometry: {
        type: 'Point',
        coordinates: [place.location.lng, place.location.lat],
      },
      properties: {
        city: place.city.slug.current,
        name: place.name,
        slug: place.slug.current,
        note: place.note,
        url: place.url,
        address: place.address,
      },
    }),
  );

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

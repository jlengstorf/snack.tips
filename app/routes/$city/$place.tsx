import { LoaderFunction, useLoaderData, useOutletContext } from 'remix';
import { getPlace } from '.';

export const loader: LoaderFunction = async ({ params }) => {
  const { city = '', place: placeSlug = '' } = params;
  const place = await getPlace(city, placeSlug);

  return place;
};

export default function Place() {
  const resetMapPosition = useOutletContext();
  const place = useLoaderData();

  return (
    <div>
      <h1 className="place-name">{place.properties.name}</h1>
      <p className="address">{place.properties.address}</p>
      <p>{place.properties.note}</p>
      <p>
        <a href={place.properties.url}>Open in Google Maps</a>
      </p>
      <a href={`/${place.properties.city}`} onClick={resetMapPosition}>
        &larr; back to {place.properties.city}
      </a>
    </div>
  );
}

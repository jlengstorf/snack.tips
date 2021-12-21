import { Link, LoaderFunction, useLoaderData } from 'remix';
import { getLocation } from '../$location';

export const loader: LoaderFunction = async ({ params }) => {
  const { location: city = '', place = '' } = params;
  const location = await getLocation(city, place);

  return location;
};

export default function Place() {
  const location = useLoaderData();

  return (
    <div>
      <h1 className="location-name">{location.properties.name}</h1>
      <p className="address">{location.properties.address}</p>
      <p>{location.properties.note}</p>
      <p>
        <a href={location.properties.url}>Open in Google Maps</a>
      </p>
      <Link to={`/${location.properties.city}`}>
        &larr; back to {location.properties.city}
      </Link>
    </div>
  );
}

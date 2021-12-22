import { useParams } from 'remix';

export default function LocationDefault() {
  const { city } = useParams();

  return (
    <div>
      <h1 className="place-name">Snack tips for {city}</h1>
      <p>
        Click one of the dots on the map or click the name of a place in the
        sidebar to start snacking like a pro.
      </p>
    </div>
  );
}

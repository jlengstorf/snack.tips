import type { MetaFunction } from 'remix';
import { Link } from 'remix';

export let meta: MetaFunction = () => {
  return {
    title: 'snack.tips',
    description: 'Snack better!',
  };
};

export default function Index() {
  return (
    <main className="container">
      <h1>Snack.Tips</h1>
      <p>
        Do you like snacks? How about hot tips? Put 'em together and you're in
        for a treat — literally!
      </p>
      <p>
        See snack tips for <Link to="/portland">Portland</Link>.
      </p>
    </main>
  );
}

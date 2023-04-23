import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '@/firebase/clientApp';
import RouteOnClient from '@/utils/RouteOnClient';
import Spinner from '@/components/common/Spinner';
import Link from 'next/link';

export default function Home() {
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <>
      {loading && <Spinner />}
      {!loading && !user && (
        // <Image src={pixelImg} onLoad={() => router.push('/auth')} />
        <RouteOnClient path="/auth" />
      )}
      {!loading && user && (
        <>
          <h1>Welcome to Fresh Find</h1>
          <nav>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              <Link href={'/app/foods'}>Food</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <Link href={'/app/foods'}>Food_dev</Link>
            </button>
            <Link href={'/app/foods'}>Food_dev</Link>
          </nav>
        </>
      )}
    </>
  );
}

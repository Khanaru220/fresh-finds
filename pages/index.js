import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '@/firebase/clientApp';
import RouteOnClient from '@/utils/RouteOnClient';
import Spinner from '@/components/App/Spinner';

export default function Home() {
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <>
      {loading && !user && <Spinner />}
      {!loading && !user && (
        // <Image src={pixelImg} onLoad={() => router.push('/auth')} />
        <RouteOnClient path="/auth" />
      )}
      {!loading && user && <RouteOnClient path="/app/foods" />}
    </>
  );
}

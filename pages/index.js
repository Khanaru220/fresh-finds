import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '@/firebase/clientApp';
import RouteOnClient from '@/utils/RouteOnClient';
import Spinner from '@/components/common/Spinner';
import Link from 'next/link';
import NavBarMobile from '@/components/Pages/NavBarMobile';

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
          <RouteOnClient path="/app/foods" />
        </>
      )}
    </>
  );
}

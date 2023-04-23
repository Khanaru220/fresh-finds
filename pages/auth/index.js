import { firebase } from '@/firebase/clientApp.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import RouteOnClient from '@/utils/RouteOnClient.js';
import { useAppContext } from '@/context/useContext';
import Spinner from '@/components/common/Spinner';
import { useEffect } from 'react';

// Source: https://github.com/firebase/firebaseui-web-react#using-styledfirebaseauth-with-a-redirect
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup', // (!) weird, need this prop to redirect aftere success
  // Redirect to / after sign in  is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  //Source: https://firebase.google.com/docs/reference/js/v8/firebase.auth.GithubAuthProvider#static-provider_id
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};

export default function Auth() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [curUser, setCurUser] = useAppContext().curUser;

  useEffect(() => {
    if (user) {
      setCurUser(user);
    }
  }, [user]);

  if (loading) return <Spinner />;
  else if (user) return <RouteOnClient path="/" />;
  else
    return (
      <div className="flex flex-col pt-14 pb-20 justify-between items-center w-screen h-screen">
        <header className="text-center">
          <h1 className="text-5xl font-bold text-[#006400] mb-2">
            Fresh Finds
          </h1>
          <p className="text-sm font-semibold">
            Sourced from your local farmers
          </p>
        </header>
        <div>
          {/* <p className="text-center text-sm">Join with us:</p> */}
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
}

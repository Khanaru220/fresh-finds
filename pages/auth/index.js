import { firebase } from '@/firebase/clientApp.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import RouteOnClient from '@/utils/RouteOnClient.js';

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
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};

export default function Auth() {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (user) return <RouteOnClient path="/" />;
  else
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
}
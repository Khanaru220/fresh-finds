import firebase from 'firebase/app';
import 'firebase/auth'; // for firebase.auth()
import 'firebase/firestore'; // so we can use firebase.firestore()

const credentials = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};
console.log(process.env.NEXT_PUBLIC_API_KEY);
if (!firebase.apps.length) firebase.initializeApp(credentials);

const db = firebase.firestore();
export { firebase, db };

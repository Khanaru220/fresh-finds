import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppContext } from '@/context/useContext';
import { firebase } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { db } from '@/firebase/clientApp';
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore';

export default function InitStates() {
  const [auth, authLoading, authError] = useAuthState(firebase.auth());
  const [curUser, setCurUser] = useAppContext().curUser;

  // need read from firestore, because hook not return custom prop (e.g. likedList)

  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [foods, foodLoading, foodError] = useCollectionData(
    db.collection('food_mock')
  );
  const [contextFoods, setFoods] = useAppContext().foods;

  useEffect(() => {
    if (foods) {
      setFoods(foods);
    }
  }, [foods]);

  useEffect(() => {
    if (auth) {
      setCurUser(auth);
    }
  }, [auth]);
  return <></>;
}

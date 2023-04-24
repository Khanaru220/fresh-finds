import { useAuthState, useDocumentDataOnce } from 'react-firebase-hooks/auth';
import { useAppContext } from '@/context/useContext';
import { firebase } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { db } from '@/firebase/clientApp';
import {
  useCollectionData,
  useCollectionDataOnce,
  useDocument
} from 'react-firebase-hooks/firestore';

export default function InitStates() {
  const [auth, loading, error] = useAuthState(firebase.auth());
  const [curUserData, setCurUserData] = useAppContext().curUserData;

  // need read from firestore, because hook not return custom prop (e.g. likedList)

  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [contextFoods, setFoods] = useAppContext().foods;
  // const [foods, foodLoading, foodError] = useCollectionDataOnce(
  //   contextFoods?.apple ? db.collection('food_mock') : ''
  // );

  useEffect(async () => {
    if (Object.keys(curUserData).length === 0 && !auth) return;
    const user = await db.doc(`users_test/${auth.uid}`).get();
    console.log('request for `user`');
    console.log(user.data());
    setCurUserData(user.data());
  }, [auth]);

  return <></>;
}

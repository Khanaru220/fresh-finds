import { createContext, useContext, useEffect, useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/clientApp';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [foods, setFoods] = useState({});
  const [curAuth, setCurAuth] = useState({});
  const [curUserData, setCurUserData] = useState({});
  const [users, setUsers] = useState({});

  useEffect(async () => {
    let foods = localStorage.getItem('foods')
      ? JSON.parse(localStorage.getItem('foods'))
      : {};
    if (!localStorage.getItem('foods')) {
      console.log('useCollectionData');
      const col = await db.collection('food_mock').get();
      foods = col.docs.map((doc) => doc.data());
      window.localStorage.setItem('foods', JSON.stringify(foods));
    }
    setFoods(foods);
  }, []);

  return (
    <AppContext.Provider
      value={{
        foods: [foods, setFoods],
        users: [users, setUsers],
        curUserData: [curUserData, setCurUserData],
        curAuth: [curAuth, setCurAuth]
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

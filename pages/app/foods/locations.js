import { useAppContext } from '@/context/useContext';
import Spinner from '@/components/common/Spinner';
import FoodCategory from '@/components/App/FoodCategory';
import CategoryBar from '@/components/App/CategoryBar';
import SearchBar from '@/components/App/SearchBar';
import ButtonFilter from '@/components/common/ButtonFilter';
import { firebase } from '@/firebase/clientApp.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

export default function foods() {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [contextFoods, setFoods] = useAppContext().foods;
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate

  // const [foods, loading, error] = useCollectionDataOnce(
  //   db.collection('food_mock')
  // );

  return (
    <>
      {!user && loading && <Spinner />}
      {!user && !loading && (
        <div className="text-center flex items-center flex-col">
          <h2>Join with us and explore these collections</h2>
          <Link href="/auth">
            <button className="block font-bold bg-[#8B4513] text-white p-1 cursor-pointer">
              LOG IN
            </button>
          </Link>
        </div>
      )}
      {user && !contextFoods?.length && (
        <h5>We're running out of foods in database</h5>
      )}
      {user && contextFoods?.length && (
        <>
          <CategoryBar />
          <div className="w-full py-4 px-3 flex justify-between">
            <SearchBar />
            <ButtonFilter />
          </div>
          <FoodCategory category={'locations'} />
        </>
      )}
    </>
  );
}

import { db } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import FoodFigure from '@/components/App/FoodFigure';
import { useAppContext } from '@/context/useContext';
import Spinner from '@/components/common/Spinner';
import FoodCategory from '@/components/App/FoodCategory';
import CategoryBar from '@/components/App/CategoryBar';
import SearchBar from '@/components/App/SearchBar';
import ButtonFilter from '@/components/common/ButtonFilter';

export default function foods() {
  const [contextFoods, setFoods] = useAppContext().foods;
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [foods, loading, error] = useCollectionData(db.collection('food_mock'));

  useEffect(() => {
    if (foods) {
      setFoods(foods);
    }
  }, [foods]);
  return (
    <>
      {loading && !foods && <Spinner />}
      {!loading && !foods && <h2>Sorry we're running out of food.</h2>}
      {!loading && foods && (
        <>
          {/* <div className="flex items-center gap-3 w-screen overflow-scroll">
            {foods?.docs?.slice(0, 20).map((doc) => {
              return <FoodFigure doc={doc} key={doc.id} />;
            })}
          </div> */}
          <CategoryBar />
          <div className="w-full py-4 px-3 flex justify-between">
            <SearchBar />
            <ButtonFilter />
          </div>
          <FoodCategory category={'types'} />
        </>
      )}
    </>
  );
}

// if (!loading) {
// 	const data = foods.docs.map((doc) => ({
// 		id: doc.id,
// 		...doc.data()
// 	}));
// 	console.log(data);
// }

// return <div className="text-orange-700">./app/foods</div>;

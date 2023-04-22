import { db } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import FoodFigure from '@/components/App/FoodFigure';
import { useAppContext } from '@/context/useContext';
import Spinner from '@/components/App/Spinner';

export default function foods() {
  const [contextFoods, setFoods] = useAppContext().foods;
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [foods, loading, error] =
    Object.keys(contextFoods).length === 0
      ? useCollection(db.collection('food_mock'))
      : contextFoods;

  useEffect(() => {
    if (foods?.docs?.apple) {
      setFoods(foods.docs);
    }
  }, [loading]);
  return (
    <>
      {loading && !foods && <Spinner />}
      {!loading && !foods && <h2>Sorry we're running out of food.</h2>}
      {!loading && foods && (
        <div className="flex items-start justify-center gap-4">
          {foods?.docs?.slice(0, 20).map((doc) => {
            return <FoodFigure doc={doc} key={doc.id} />;
          })}
        </div>
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

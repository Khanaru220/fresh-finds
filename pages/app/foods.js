import { db } from '@/firebase/clientApp';
import { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import FoodFigure from '@/components/App/FoodFigure';

export default function foods() {
  // Docs: https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate
  const [foods, loading, error] = useCollection(db.collection('khan_test'));
  return (
    <>
      <div className="flex items-start justify-center gap-4">
        {foods?.docs?.map((doc) => {
          return <FoodFigure doc={doc} key={doc.id} />;
        })}
      </div>
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

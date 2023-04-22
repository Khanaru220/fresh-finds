import { useEffect } from 'react';
import FoodFigure from './FoodFigure';
import { useAppContext } from '@/context/useContext';
import { useRef } from 'react';

// display on specific types (types, diets, locations)
export default function FoodCategory({ category }) {
  const [foods, setFoods] = useAppContext().foods;
  const categories = useRef([]);

  useEffect(() => {
    if (foods?.length) {
      categories.current = [
        ...new Set(foods.map((f) => f.data()[category]).flat())
      ];
    }
  }, [foods]);

  return (
    <>
      {categories.current.slice(0, 10).map((cate) => (
        <div key={cate}>
          <h2 className="text-lg font-bold text-orange-500">{cate}</h2>

          <div className="flex items-center gap-3 w-screen overflow-scroll">
            {foods
              .filter((f) => {
                return f.data()[category].includes(cate);
              })
              .map((f) => {
                console.log(f.id);
                console.log(f);
                return <FoodFigure doc={f} key={f.id} />;
              })}
          </div>
        </div>
      ))}
      {}
    </>
  );
}

// <>
//   <h2>{cate}</h2>
//   <FoodFigure doc={doc} key={doc.id} />
// </>

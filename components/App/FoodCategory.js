import { useEffect, useState } from 'react';
import FoodFigure from './FoodFigure';
import { useAppContext } from '@/context/useContext';

// display on specific types (types, diets, locations)
export default function FoodCategory({ category }) {
  const [foods, setFoods] = useAppContext().foods;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (foods?.length) {
      const foodsInCategory = [
        ...new Set(foods.map((food) => food[category]).flat())
      ];
      setCategories(foodsInCategory);
    }
  }, [foods]);

  return (
    <>
      {foods?.length &&
        categories.length > 1 &&
        categories.slice(0, 10).map((cate) => (
          <div key={cate} className="ml-7 mb-5 our-shadow">
            <h2 className="mb-2 text-lg font-bold">{cate}</h2>

            <div className="flex items-baseline gap-3 w-screen overflow-scroll">
              {foods
                .filter((food) => {
                  return food[category].includes(cate);
                })
                .map((food, i) => {
                  return <FoodFigure iForImg={i} food={food} key={food.name} />;
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

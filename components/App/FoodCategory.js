import { useEffect, useState } from 'react';
import FoodFigure from './FoodFigure';
import { useAppContext } from '@/context/useContext';
import generateNonrepeatNumbers from '@/utils/generateNonrepeatNumbers';

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
        generateNonrepeatNumbers(10, 0, categories.length).map((i) => {
          return (
            <div key={categories[i]} className="ml-7 mb-5 our-shadow">
              <h2 className="mb-2 text-lg font-bold">{categories[i]}</h2>

              <div className="flex items-baseline gap-3 w-screen overflow-scroll">
                {foods
                  .filter((food) => {
                    return food[category].includes(categories[i]);
                  })
                  .map((food) => {
                    return <FoodFigure food={food} key={food.name} />;
                  })}
              </div>
            </div>
          );
        })}
    </>
  );
}

// <>
//   <h2>{cate}</h2>
//   <FoodFigure doc={doc} key={doc.id} />
// </>

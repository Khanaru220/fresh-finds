import { useEffect, useState, useRef } from 'react';
import FoodFigure from './FoodFigure';
import { useAppContext } from '@/context/useContext';
import generateNonrepeatNumbers from '@/utils/generateNonrepeatNumbers';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

// display on specific types (types, diets, locations)
export default function FoodCategory({ category }) {
  const [foods, setFoods] = useAppContext().foods;
  const [filteredFoods, setFilteredFoods] = useState(null);

  const randomList = useRef({ subCategories: [], food: {} });
  const subCategories = useRef([]);

  useEffect(() => {
    if (foods?.length) {
      const filteredFoods = {};

      for (const food of foods) {
        food[category].forEach((cate) => {
          filteredFoods[cate] = !filteredFoods[cate]
            ? [food]
            : [...new Set([...filteredFoods[cate], food])];
        });
      }
      subCategories.current = Object.keys(filteredFoods);

      // create shuffle list
      if (subCategories.current.length > 0) {
        randomList.current.subCategories = generateNonrepeatNumbers(
          subCategories.current.length < 11 ? subCategories.current.length : 10,
          0,
          subCategories.current.length - 1
        );

        subCategories.current.forEach((cate) => {
          randomList.current.food[cate] = generateNonrepeatNumbers(
            filteredFoods[cate].length > 10 ? 10 : filteredFoods[cate].length,
            0,
            filteredFoods[cate].length - 1
          );
        });
      }

      setFilteredFoods(filteredFoods);
    }
  }, [foods]);

  // console.log('randomList.current', randomList.current);
  // console.log(
  // 'subCategories.current.food',
  // randomList.current?.food[subCategories.current[1]]?.forEach(
  // (e) => console.log('e', e)
  // )
  // );

  return (
    <>
      {foods?.length &&
        filteredFoods &&
        randomList.current.subCategories.map((cate_i) => {
          return (
            <div key={subCategories.current[cate_i]} className="ml-7 mb-5">
              <h2 className="mb-2 text-lg font-bold">
                {capitalizeFirstLetter(subCategories.current[cate_i])}
              </h2>

              <div className="flex items-baseline gap-4 w-screen overflow-scroll">
                {randomList.current.food[subCategories.current[cate_i]].map(
                  (food_i) => {
                    return (
                      <FoodFigure
                        food={
                          filteredFoods[subCategories.current[cate_i]][food_i]
                        }
                        key={
                          cate_i +
                          filteredFoods[subCategories.current[cate_i]][food_i]
                            .name
                        }
                      />
                    );
                  }
                )}
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

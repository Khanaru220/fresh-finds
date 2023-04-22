/**
 * @param   doc  comes from db.collection(<>).get() or docs.map()
 * @returns Component: vertical figure with image, details of food
 */

import { HeartIcon } from '@heroicons/react/24/outline';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useCallback } from 'react';

export default function FoodFigure({ doc }) {
  const likeFood = useCallback((e) => {
    const btnHeartLike = e.currentTarget;
    const likedStyles = ['fill-red-500', 'text-red-600'];
    // (TODO) need a logic state
    console.log([...btnHeartLike.classList].includes(likedStyles[0]));

    if ([...btnHeartLike.classList].includes(likedStyles[0])) {
      btnHeartLike.classList.remove(...likedStyles);
    } else {
      btnHeartLike.classList.add(...likedStyles);
    }
  });

  return (
    <figure className="flex gap-1 flex-col">
      <div className="relative w-40 h-20  border-green-400 border-2 overflow-hidden">
        <img
          src={doc?.data()?.photoURL}
          alt={`a picture of ${doc.name}`}
          className="h-full w-full object-fill"
        />
        <div className="w-full absolute right-0 bottom-0 bg-black/70 flex justify-between items-center ">
          <span className="text-cyan-50">
            {capitalizeFirstLetter(doc?.data()?.name)}
          </span>

          <HeartIcon
            className=" w-5 h-5 text-white/90"
            onClick={likeFood}
            role="button to like food"
          />
        </div>
      </div>
      <span>
        <b>ID</b> {doc.id}
      </span>
      <span>
        <b>Types</b> [
        {doc
          ?.data()
          ?.types.map((w) => capitalizeFirstLetter(w))
          .join(', ')}
        ]
      </span>
      <span>
        <b>Locations</b> [
        {doc
          ?.data()
          ?.locations.map((w) => capitalizeFirstLetter(w))
          .join(', ')}
        ]
      </span>
    </figure>
  );
}

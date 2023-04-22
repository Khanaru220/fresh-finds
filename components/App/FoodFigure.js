/**
 * @param   doc  comes from db.collection(<>).get() or docs.map()
 * @returns Component: vertical figure with image, details of food
 */

import {
  HeartIcon,
  ChevronUpIcon,
  ArrowUpCircleIcon
} from '@heroicons/react/24/outline';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useCallback } from 'react';

// export default function FoodFigure({ doc }) {
//   const likeFood = useCallback((e) => {
//     const btnHeartLike = e.currentTarget;
//     const likedStyles = ['fill-red-500', 'text-red-600'];
//     // (TODO) need a logic state
//     console.log([...btnHeartLike.classList].includes(likedStyles[0]));

//     if ([...btnHeartLike.classList].includes(likedStyles[0])) {
//       btnHeartLike.classList.remove(...likedStyles);
//       btnHeartLike.classList.add('text-white/90'); // (TODO) find way to overwrite default styles
//     } else {
//       btnHeartLike.classList.add(...likedStyles);
//       btnHeartLike.classList.remove('text-white/90'); // (TODO) find way to overwrite default styles
//     }
//   });

//   return (
//     <figure className="flex gap-1 flex-col">
//       <div className="relative w-40 h-20  border-green-400 border-2 overflow-hidden">
//         <img
//           src={doc?.data()?.photoURL}
//           alt={`a picture of ${doc.name}`}
//           className="h-full w-full object-fill"
//         />
//         <div className="w-full absolute right-0 bottom-0 bg-black/70 flex justify-between items-center ">
//           <span className="text-cyan-50">
//             {capitalizeFirstLetter(doc?.data()?.name)}
//           </span>

//           <HeartIcon
//             className="w-5 h-5 text-white/90"
//             onClick={likeFood}
//             role="button to like food"
//           />
//         </div>
//       </div>
//       <span>
//         <b>ID</b> {doc.id}
//       </span>
//       <span>
//         <b>Types</b> [
//         {doc
//           ?.data()
//           ?.types.map((w) => capitalizeFirstLetter(w))
//           .join(', ')}
//         ]
//       </span>
//       <span>
//         <b>Locations</b> [
//         {doc
//           ?.data()
//           ?.locations.map((w) => capitalizeFirstLetter(w))
//           .join(', ')}
//         ]
//       </span>
//     </figure>
//   );
// }

export default function FoodFigure({ doc }) {
  const likeFood = useCallback((e) => {
    const btnHeartLike = e.currentTarget.querySelector('.icon-like');
    const likedStyles = ['fill-red-500', 'text-red-600'];
    // (TODO) need a logic state
    console.log([...btnHeartLike.classList].includes(likedStyles[0]));

    if ([...btnHeartLike.classList].includes(likedStyles[0])) {
      btnHeartLike.classList.remove(...likedStyles);
      btnHeartLike.classList.add('text-black'); // (TODO) find way to overwrite default styles
    } else {
      btnHeartLike.classList.add(...likedStyles);
      btnHeartLike.classList.remove('text-black'); // (TODO) find way to overwrite default styles
    }
  });
  // Author: https://tailwindcomponents.com/u/vldmihalache
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px undefined">
        <div className="h-full w-full">
          <div className="relative w-full">
            <img
              src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
              className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
              alt=""
            />
            <button
              onClick={likeFood}
              className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                <HeartIcon className="text-black w-5 h-5 icon-like" />
                {/* <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                  ></path>
                </svg> */}
              </div>
            </button>
          </div>
          <div className="mb-3 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700">
                {' '}
                {capitalizeFirstLetter(doc.data().name)}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                In:{' '}
                {doc
                  .data()
                  .locations.map((w) => capitalizeFirstLetter(w))
                  .join(', ')}{' '}
              </p>
            </div>
            <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
              <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                +5
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png"
                  alt=""
                />
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png"
                  alt=""
                />
              </span>
              <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between md:items-center lg:justify-between ">
            <div className="flex">
              <p className="!mb-0 text-sm font-bold text-brand-500">
                Redundant:{' '}
                <ArrowUpCircleIcon className="text-white w-5 h-5 inline-block fill-green-600" />
                <span>180%</span>
              </p>
            </div>
            <button
              href=""
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>
      <p className="font-normal text-navy-700 mt-20 mx-auto w-max">
        Notifications Card component from{' '}
        <a
          href="https://horizon-ui.com?ref=tailwindcomponents.com"
          target="_blank"
          className="text-brand-500 font-bold"
        >
          Horizon UI Tailwind React
        </a>
      </p>
    </div>
  );
}

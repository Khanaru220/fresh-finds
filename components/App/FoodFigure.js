/**
 * @param   doc  comes from db.collection(<>).get() or docs.map()
 * @returns Component: vertical figure with image, details of food
 */

import {
  HeartIcon,
  ChevronUpIcon,
  ArrowUpCircleIcon,
  ArrowDownCircleIcon
} from '@heroicons/react/24/outline';
import { useAppContext } from '@/context/useContext';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useCallback, useRef } from 'react';
import updateDocument from '@/utils/updateDocument';
import {
  useCollection,
  useDocumentData,
  useDocumentDataOnce,
  useDocument
} from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/clientApp';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// import img1 from '/assets/1.png';
// import img2 from '/assets/2.png';
// import img3 from '/assets/3.png';
// import img4 from '/assets/4.png';
// import img5 from '/assets/5.png';
// import img6 from '/assets/6.png';

export default function FoodFigure({ food }) {
  const [curUserData, setCurUserData] = useAppContext().curUserData;

  const likedStyles = useRef({
    default: ['text-[#FFA07A]'],
    liked: ['fill-red-500', 'text-red-600']
  });

  const likeFood = useCallback((e) => {
    const localLikedList = !curUserData?.likedList ? [] : curUserData.likedList;

    const btnHeartLike = e.currentTarget.querySelector('.icon-like');
    // (TODO) need a logic state

    if ([...btnHeartLike.classList].includes(likedStyles.current.liked[0])) {
      // unlike
      btnHeartLike.classList.remove(...likedStyles.current.liked);
      btnHeartLike.classList.add(''); // (TODO) find way to overwrite default styles
      setCurUserData((current) => ({
        ...current,
        likedList: current.likedList.filter((f) => f !== food.name)
      }));
      updateDocument({
        collection: 'users_test',
        doc: curUserData.uid,
        data: { likedList: localLikedList.filter((l) => l !== food.name) }
      });
    } else if (
      [...btnHeartLike.classList].includes(likedStyles.current.default[0])
    ) {
      // like
      btnHeartLike.classList.add(...likedStyles.current.liked);
      btnHeartLike.classList.remove('text-[#FFA07A]'); // (TODO) find way to overwrite default styles
      setCurUserData((current) => {
        const currentLikedList = !current.likedList ? [] : current.likedList;
        return {
          ...current,
          likedList: [...new Set([...currentLikedList, food.name])]
        };
      });
      updateDocument({
        collection: 'users_test',
        doc: curUserData.uid,
        data: { likedList: [...new Set([...localLikedList, food.name])] }
      });
    }
  });

  // Author: https://tailwindcomponents.com/u/vldmihalache
  return (
    <>
      {curUserData?.uid && (
        <div className="our-shadow">
          <div className="h-44 w-44 gap-6  p-5 aspect-square relative bg-white rounded-lg flex justify-center items-center flex-col">
            <div className="flex items-center justify-center">
              <img src={food.photoURL} className="w-4/5 h-4/5 aspect-square" />
            </div>

            <button
              onClick={likeFood}
              className="absolute top-3 right-3  flex items-center justify-center rounded-full bg-white p-1 text-brand-500 hover:cursor-pointer"
            >
              <div className="  flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                <HeartIcon
                  className={`w-5 h-5 icon-like ${
                    curUserData?.likedList?.includes(food.name)
                      ? likedStyles.current.liked.join(' ')
                      : likedStyles.current.default.join(' ')
                  }`}
                />
              </div>
            </button>
            {/* Source: https://tailwind-elements.com/docs/standard/components/cards/ */}
            <div>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {capitalizeFirstLetter(food.name)}
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//const a = {
//  s: (
//     <figure className="flex flex-col items-center w-1/3">
//       <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px undefined">
//         <div className="h-full w-full">
//           <div className="relative w-full">
//             <img
//               src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/Nft3.3b3e6a4b3ada7618de6c.png"
//               className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
//               alt=""
//             />
//             <button
//               onClick={likeFood}
//               className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
//             >
//               <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
//                 <HeartIcon className="text-black w-4 h-4 icon-like" />
//               </div>
//             </button>
//           </div>
//           <div className="mb-3 flex items-center justify-between px-1 md:items-start">
//             <div className="mb-2">
//               <p className="text-lg font-bold text-navy-700">
//                 {capitalizeFirstLetter(food.name)}
//               </p>
//               {/* Source ellipse: http://stackoverflow.com/questions/36652580/ddg#36653821 */}
//               <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 overflow-hidden text-ellipsis w-24 whitespace-nowrap">
//                 {food.locations.map((w) => capitalizeFirstLetter(w)).join(', ')}
//               </p>
//             </div>
//             {/* <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
// 				<span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
// 					+5
// 				</span>
// 				<span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
// 					<img
// 						className="h-full w-full rounded-full object-cover"
// 						src={`https://randomuser.me/api/portraits/thumb/men/5.jpg`}
// 						alt=""
// 					/>
// 				</span>
// 				<span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
// 					<img
// 						className="h-full w-full rounded-full object-cover"
// 						src={`https://randomuser.me/api/portraits/thumb/women/2.jpg`}
// 						alt=""
// 					/>
// 				</span>
// 			</div> */}
//           </div>
//           <div className="flex items-center justify-between md:items-center lg:justify-between ">
//             <div className="flex">
//               <p className="!mb-0 text-sm font-bold text-brand-500">
//                 {+food.carbonSave < 0 ? (
//                   <>
//                     Scarce:
//                     <ArrowDownCircleIcon className="text-white w-5 h-5 inline-block fill-red-600" />
//                   </>
//                 ) : (
//                   <>
//                     Redundant:
//                     <ArrowUpCircleIcon className="text-white w-5 h-5 inline-block fill-green-600 " />
//                   </>
//                 )}
//                 <span>{food.carbonSave}%</span>
//               </p>
//             </div>
//             {/* <button
// 		href=""
// 		className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
// 	>
// 		Place Bid
// 	</button> */}
//           </div>
//         </div>
//       </div>
//       {/* <p className="font-normal text-navy-700 mt-20 mx-auto">
// Notifications Card component from{' '}
// <a
// href="https://horizon-ui.com?ref=tailwindcomponents.com"
// target="_blank"
// className="text-brand-500 font-bold"
// >
// Horizon UI Tailwind React
// </a>
// </p> */}
//     </figure>
//   )
// };

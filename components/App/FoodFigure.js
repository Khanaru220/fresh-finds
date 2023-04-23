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
  useDocument
} from 'react-firebase-hooks/firestore';
import { db } from '@/firebase/clientApp';
import { useEffect } from 'react';

export default function FoodFigure({ food }) {
  const [curUser, setCurUser] = useAppContext().curUser;
  // const [user, userLoading, userError] = useCollection(
  //   db.collection('users_test'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true }
  //   }
  // );
  const [user, loading, error] = useDocumentData(
    db.doc(`users_test/${curUser.uid}`)
  );
  const iconSeason = useRef({
    spring: '🌸',
    summer: '☀️',
    autumn: '🍁',
    winter: '❄️'
  });

  const likeFood = useCallback((e) => {
    const localLikedList = !user.likedList ? [] : user.likedList;

    const btnHeartLike = e.currentTarget.querySelector('.icon-like');
    const likedStyles = ['fill-red-500', 'text-red-600'];
    // (TODO) need a logic state

    if ([...btnHeartLike.classList].includes(likedStyles[0])) {
      btnHeartLike.classList.remove(...likedStyles);
      btnHeartLike.classList.add('text-black'); // (TODO) find way to overwrite default styles
      updateDocument({
        collection: 'users_test',
        doc: curUser.uid,
        data: { likedList: localLikedList.filter((l) => l === food.name) }
      });
    } else {
      btnHeartLike.classList.add(...likedStyles);
      btnHeartLike.classList.remove('text-black'); // (TODO) find way to overwrite default styles
      updateDocument({
        collection: 'users_test',
        doc: curUser.uid,
        data: { likedList: [...new Set([...localLikedList, food.name])] }
      });
    }
  });

  const createRandomUserImage = () => {
    const gender = Math.round(Math.random()) === 0 ? 'men' : 'women';
    const index = Math.round(Math.random() * 50);
    return `https://randomuser.me/api/portraits/thumb/${gender}/${index}.jpg`;
  };

  // Author: https://tailwindcomponents.com/u/vldmihalache
  return (
    <>
      {!curUser?.uid && <h2>You need sign-in first to view this board</h2>}
      {curUser?.uid && (
        <figure className="flex flex-col items-center w-1/3">
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
                  </div>
                </button>
              </div>
              <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                <div className="mb-2">
                  <p className="text-lg font-bold text-navy-700">
                    {capitalizeFirstLetter(food.name)}
                  </p>
                  {/* Source ellipse: http://stackoverflow.com/questions/36652580/ddg#36653821 */}
                  <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2 overflow-hidden text-ellipsis w-24 whitespace-nowrap">
                    {food.locations
                      .map((w) => capitalizeFirstLetter(w))
                      .join(', ')}
                  </p>
                </div>
                <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
                  <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
                    +5
                  </span>
                  <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={`https://randomuser.me/api/portraits/thumb/men/5.jpg`}
                      alt=""
                    />
                  </span>
                  <span className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={`https://randomuser.me/api/portraits/thumb/women/2.jpg`}
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between md:items-center lg:justify-between ">
                <div className="flex">
                  <p className="!mb-0 text-sm font-bold text-brand-500">
                    {+food.carbonSave < 0 ? (
                      <>
                        Scarce:
                        <ArrowDownCircleIcon className="text-white w-5 h-5 inline-block fill-red-600" />
                      </>
                    ) : (
                      <>
                        Redundant:
                        <ArrowUpCircleIcon className="text-white w-5 h-5 inline-block fill-green-600 " />
                      </>
                    )}
                    <span>{food.carbonSave}%</span>
                  </p>
                </div>
                {/* <button
              href=""
              className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
            >
              Place Bid
            </button> */}
              </div>
            </div>
          </div>
          {/* <p className="font-normal text-navy-700 mt-20 mx-auto">
        Notifications Card component from{' '}
        <a
          href="https://horizon-ui.com?ref=tailwindcomponents.com"
          target="_blank"
          className="text-brand-500 font-bold"
        >
          Horizon UI Tailwind React
        </a>
      </p> */}
        </figure>
      )}
    </>
  );
}

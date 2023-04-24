import { useAppContext } from '@/context/useContext';
import { db } from '@/firebase/clientApp';
import { useEffect, useState, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Spinner from '@/components/common/Spinner';
import {
  useDocumentData,
  useDocumentDataOnce
} from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '@/firebase/clientApp';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

export default function favorite() {
  // const [curAuth, _loading, _error] = useAuthState(firebase.auth());

  // const [curAuth, setCurAuth] = useAppContext().curAuth;
  const [foods, setFoods] = useAppContext().foods;
  const [curUserData, setCurUserData] = useAppContext().curUserData;
  const [user, loading, error] = useAuthState(firebase.auth());
  const [favFoods, setFavFoods] = useState(null);

  const iconSeason = useRef({
    spring: '🌸',
    summer: '☀️',
    autumn: '🍁',
    winter: '❄️'
  });

  useEffect(() => {
    if (curUserData?.likedList?.length > 0) {
      setFavFoods(
        foods.filter((food) => curUserData.likedList.includes(food.name))
      );
    } else if (curUserData && foods) {
      setFavFoods(false);
    }
  }, [curUserData]);
  return (
    <>
      {(loading || favFoods === null) && <Spinner />}
      {!loading && !user && <h2>You're not logged in!</h2>}
      {!loading && user && favFoods && (
        <table className="ml-44 mt-8 mx-2 mb-96 overflow-scroll text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs rounded-t-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Diets
              </th>
              <th scope="col" className="px-6 py-3">
                Locations
              </th>
              <th scope="col" className="px-6 py-3">
                Seasons
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {favFoods.map((food) => {
              return (
                <tr
                  key={food.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-2 text-gray-900  dark:text-white w-1/3"
                  >
                    <img
                      className="w-10 h-10 rounded-full text-sm aspect-square"
                      src={food.photoURL}
                      alt={`<${food.name}>`}
                    />
                    <div className="pl-3 inline-block">
                      <div className="text-base font-semibold">{food.name}</div>
                      {/* <div className="font-normal text-gray-500">
													{food.types.join(', ')}
												</div> */}
                    </div>
                  </th>
                  <td className="px-6 py-2 text-sm w-1/6 whitespace-break-spaces">
                    {food.diets.map((w) => capitalizeFirstLetter(w)).join(', ')}
                  </td>
                  <td className="px-6 py-2 text-sm w-1/5 whitespace-break-spaces">
                    {food.locations.join(', ')}
                  </td>
                  <td className="py-2 w-1/3">
                    <div className="flex items-center">
                      <div className="text-sm h-2 w-2 aspect-square rounded-full bg-green-500 mr-2"></div>
                      <p className="">
                        {food.seasons
                          .map(
                            (season) =>
                              iconSeason.current[season] +
                              capitalizeFirstLetter(season).slice(0, 4) +
                              '.'
                          )
                          .join(', ')}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {!loading && favFoods === false && <h2>Your list is empty!</h2>}
    </>
  );
}

{
  /* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <div>
            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Action button</span>
                Action
                <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate account</a>
                    </li>
                </ul>
                <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                </div>
            </div>
        </div>
        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div>
    
</div> */
}

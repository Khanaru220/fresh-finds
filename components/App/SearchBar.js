import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
export default function SearchBar() {
  const router = useRouter();
  const [userSearch, setUserSearch] = useState('');
  const handleSubmitSearch = useCallback((input) => {
    let defaultURL = '/app/foods/';

    const fuzzySearch = {
      pr: 'produce',
      ve: 'produce',
      di: 'diets',
      se: 'seasons',
      lo: 'locations',
      co: 'locations'
    };

    const subpage =
      fuzzySearch[Object.keys(fuzzySearch).find((w) => input.includes(w))];
    console.log('subpage', subpage);
    console.log('userSearch', userSearch);
    router.push(subpage ? defaultURL + subpage : defaultURL + 'diets');
  });

  // Source: https://flowbite.com/docs/forms/search-input/
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserSearch('');
        handleSubmitSearch(userSearch);
      }}
      className="flex items-center w-5/6 h-full our-shadow"
      action="/app/foods/diets"
      method="get"
    >
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => setUserSearch(e.currentTarget.value)}
          value={userSearch}
          type="text"
          id="simple-search"
          className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full pl-10 p-2.5  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
          placeholder="Search"
        />
      </div>
    </form>
  );
}

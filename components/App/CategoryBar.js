import { useRouter } from 'next/router';
import { HomeIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import Image from 'next/image';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import img1 from '/assets/nav_1.png';
import img2 from '/assets/nav_2.png';
import img3 from '/assets/nav_3.png';
import img4 from '/assets/nav_4.png';

export default function CategoryBar() {
  const categories = ['produce', 'seasons', 'diets', 'locations'];
  const router = useRouter();
  const highlight = useRef(`border-b-4 border-b-[#006400] text-[#006400]`);

  return (
    <div className="w-screen bg-white">
      <div className="grid h-full max-w-lg grid-cols-4  mx-auto pt-2">
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[0]}`)
              ? highlight.current
              : ''
          } flex items-center justify-center flex-col active:bg-[#E0EEE0]`}
          type="button"
          onClick={() => router.push(`/app/foods/${categories[0]}`)}
        >
          <Image src={img1} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[0])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[1]}`)
              ? highlight.current
              : ''
          } flex items-center justify-center flex-col active:bg-[#E0EEE0]`}
          type="button"
          onClick={() => router.push(`/app/foods/${categories[1]}`)}
        >
          <Image src={img2} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[1])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[2]}`)
              ? highlight.current
              : ''
          } flex items-center justify-center flex-col active:bg-[#E0EEE0]`}
          type="button"
          onClick={() => router.push(`/app/foods/${categories[2]}`)}
        >
          <Image src={img3} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[2])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[3]}`)
              ? highlight.current
              : ''
          } flex items-center justify-center flex-col active:bg-[#E0EEE0]`}
          type="button"
          onClick={() => router.push(`/app/foods/${categories[3]}`)}
        >
          <Image src={img4} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[3])}
          </span>
        </button>
      </div>
    </div>
  );
}

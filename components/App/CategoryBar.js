import { useRouter } from 'next/router';
import { HomeIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import img1 from '/assets/nav_1.png';
import img2 from '/assets/nav_2.png';
import img3 from '/assets/nav_3.png';
import img4 from '/assets/nav_4.png';

export default function CategoryBar() {
  const categories = ['produce', 'grains', 'dairy', 'meats'];
  const router = useRouter();
  return (
    <div className="w-full bg-white">
      <div className="grid h-full max-w-lg grid-cols-4  mx-auto pt-2">
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[0]}`)
              ? 'border-b-4 border-b-green-500'
              : ''
          } flex items-center justify-center flex-col  active:text-red-500`}
          type="button"
          onClick={() => router.push('/app/foods')}
        >
          <Image src={img1} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[0])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[1]}`)
              ? 'border-b-4 border-b-green-500'
              : ''
          } flex items-center justify-center flex-col  active:text-red-500`}
          type="button"
          onClick={() => router.push('/app/foods')}
        >
          <Image src={img2} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[1])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[2]}`)
              ? 'border-b-4 border-b-green-500'
              : ''
          } flex items-center justify-center flex-col  active:text-red-500`}
          type="button"
          onClick={() => router.push('/app/foods')}
        >
          <Image src={img3} />
          <span className="text-sm font-medium">
            {capitalizeFirstLetter(categories[2])}
          </span>
        </button>
        <button
          className={`${
            router.pathname.includes(`/app/foods/${categories[3]}`)
              ? 'border-b-4 border-b-green-500'
              : ''
          } flex items-center justify-center flex-col  active:text-red-500`}
          type="button"
          onClick={() => router.push('/app/foods')}
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

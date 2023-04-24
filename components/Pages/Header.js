import { useRouter } from 'next/router';

export default function Header({ heading }) {
  const { pathname } = useRouter();
  if (!heading) {
    if (pathname.includes('/app/foods')) {
      heading = 'Grocery list';
    } else if (pathname.includes('/app/profile')) {
      heading = 'Profile';
    } else if (pathname.includes('/app/favorite')) {
      heading = 'Saved list';
    }
  }
  return <h1 className="text-center text-2xl font-bold py-4">{heading}</h1>;
}

import { useRouter } from 'next/router';

export default function Header({ heading }) {
  const { pathname } = useRouter();
  if (!heading) {
    switch (pathname) {
      case '/app/foods':
        heading = 'Grocery list';
        break;
      case '/app/favorite':
        heading = 'Saved list';
      default:
        break;
    }
  }
  console.log(pathname);
  return <h1 className="text-center text-2xl font-bold py-4">{heading}</h1>;
}

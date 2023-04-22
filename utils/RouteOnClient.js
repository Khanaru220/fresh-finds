import { useRouter } from 'next/router';
import pixelImg from '../public/pixel-load.jpg';
import Image from 'next/image';

export default function RouteOnClient({ path }) {
  const router = useRouter();
  return <Image src={pixelImg} onLoad={() => router.push(path)} />;
}

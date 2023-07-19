import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/createTimeline'}>lets create a timeline</Link>
    </main>
  );
}

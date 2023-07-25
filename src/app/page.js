import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="welcome-page">
        <Link className="btn block-btn editor-link" href={'/editor'}>
          lets create a timeline
        </Link>
      </div>
    </>
  );
}

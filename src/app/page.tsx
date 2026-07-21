import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="mb-8 text-5xl">홈화면</h1>
      <Link className="border" href="/records/new">
        새 글 쓰기
      </Link>
    </div>
  );
}

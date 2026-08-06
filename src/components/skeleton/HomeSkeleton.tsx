import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SKELETON_COUNT = 5;

export function HomeSkeleton() {
  return (
    <div className="relative h-full w-full overflow-scroll bg-stone-200 p-2">
      <h1 className="mb-8 text-3xl font-bold">내 서재</h1>
      <div className="flex flex-col items-center">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div
            key={index}
            className="mb-3 flex w-100 translate-y-0 gap-3 rounded-[20px] border border-solid border-zinc-300 bg-white px-5 py-3"
          >
            <Skeleton width={46} height={64} />
            <div className="flex basis-[70%] flex-col">
              <Skeleton width={'30%'} />
              <Skeleton width={'50%'} />
              <Skeleton width={'40%'} />
            </div>
            <div className="flex h-5 w-14 items-center justify-center rounded-2xl px-2.25 py-0.75">
              <Skeleton width={50} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function RecordDetailSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-200">
      <div className="h-150 w-135 rounded-[20px] bg-white p-5">
        <div>
          <div className="my-2 flex gap-4">
            <Skeleton width={100} height={144} className="rounded-[20px] border border-zinc-200/50" />

            <div className="flex basis-[55%] flex-col justify-center gap-2">
              <h2 className="text-xl font-bold">
                <Skeleton width={90} />
              </h2>
              <p className="text-[14px] text-gray-600">
                <Skeleton width={60} />
              </p>
              <p className="text-[12px] text-zinc-400">
                <Skeleton width={60} />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex w-22">
              <Skeleton width={90} />
            </div>

            <Skeleton width={60} />
            <Skeleton width={90} />

            <p className="flex items-center">
              <Skeleton width={60} />
            </p>
          </div>
        </div>
        <hr className="mt-4 text-gray-100" />
        <div>
          <p className="text- mt- mt-7 mb-3 text-[12px] font-semibold text-zinc-400">감상</p>
          <p className="text-[15px] break-normal wrap-break-word">
            <Skeleton width={'100%'} count={5} />
          </p>
        </div>
        <div>
          <p className="mt-7 mb-3 text-[12px] font-semibold text-zinc-400">필사하고 싶은 구절</p>
          <div className="border-l-2 border-zinc-200 pl-5">
            <p className="text-[15px] break-normal wrap-break-word italic">
              <Skeleton count={3} />
            </p>
            <span className="text-[12px] text-zinc-400">
              <Skeleton width={60} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

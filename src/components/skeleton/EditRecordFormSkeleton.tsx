import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function EditRecordFormSkeleton() {
  return (
    <div className="mx-auto h-300 w-200 rounded-[18px] border border-solid border-zinc-200 p-10">
      <p className="mb-4 font-semibold text-zinc-400">책 정보</p>
      <SkeletonFormField title="책 검색" isRequired>
        <Skeleton width="100%" height={92} />
      </SkeletonFormField>

      <hr className="my-6 h-3 w-full text-gray-100" />

      <p className="mb-4 font-semibold text-zinc-400">기록 정보</p>

      <SkeletonFormField title="장르" isRequired>
        <Skeleton width="100%" height={41} />
      </SkeletonFormField>

      <SkeletonFormField title="다 읽은 날짜" isRequired>
        <Skeleton width="100%" height={41} />
      </SkeletonFormField>

      <SkeletonFormField title="평점" isRequired>
        <Skeleton width="100%" height={26} />
      </SkeletonFormField>

      <SkeletonFormField title="감상" isRequired>
        <Skeleton width="100%" height={67} />
      </SkeletonFormField>

      <SkeletonFormField title="필사하고 싶은 구절">
        <div className="mb-2 flex rounded-[18px] border border-solid border-zinc-200">
          <Skeleton width="100%" height={48} />
        </div>
        <p className="mb-2 text-[13px] text-blue-600">
          <span>+</span> 구절 추가
        </p>
      </SkeletonFormField>

      <div className="mb-2 flex items-center gap-2">
        <Skeleton width={40} height={22} borderRadius={999} />
        <span className="text-sm"> 이책은 ebook으로 읽었어요</span>
      </div>

      <Skeleton width="100%" height={48} />
    </div>
  );
}

function SkeletonFormField({
  title,
  children,
  isRequired = false,
}: {
  title: string;
  children: React.ReactNode;
  isRequired?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label>{title}</label>
        {isRequired && <span className="text-red-600">*</span>}
      </div>
      {children}
    </div>
  );
}

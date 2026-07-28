import { Portal } from './modal/Portal';

export function RecordDeleteDialog({
  close,
  open,
  onDelete,
}: {
  open: boolean;
  close: () => void;
  onDelete: () => void;
}) {
  return (
    <Portal open={open} close={close}>
      <div
        className="flex h-40 w-85 flex-col justify-center rounded-xl bg-white px-3"
        onClick={e => e.stopPropagation()}
      >
        <div className="my-5">
          <p className="text-[16px] font-bold">이 기록을 삭제할까요?</p>
          <span className="mt-1.5 text-[13px] text-gray-600">되돌릴 수 없어요</span>
        </div>
        <div className="flex w-full">
          <button
            className="mr-2 h-10 w-[50%] cursor-pointer rounded-lg border border-zinc-200 text-[14px] font-semibold"
            onClick={close}
          >
            취소
          </button>
          <button
            onClick={onDelete}
            className="h-10 w-[50%] cursor-pointer rounded-lg border border-zinc-200 bg-red-600 text-[14px] font-semibold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </Portal>
  );
}

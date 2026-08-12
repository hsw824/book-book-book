import { Error } from '../icons/Error';

interface Props {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export function ErrorSection({ title, description, buttonText, onClick }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-2">
        <Error width={48} height={48} strokeWidth={1.6} />
      </div>
      <h1 className="mb-2 text-xl font-bold">{title}</h1>
      <p className="mb-2 text-[15px] text-gray-600">{description}</p>
      <div>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-[15px] font-semibold text-white"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

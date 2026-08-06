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
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f5a623"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3.5c.36 0 .7.19.88.5l8.4 14.5a1 1 0 0 1-.87 1.5H3.6a1 1 0 0 1-.87-1.5l8.4-14.5c.18-.31.52-.5.87-.5Z" />
          <line x1="12" y1="9.5" x2="12" y2="13.8" />
          <circle cx="12" cy="16.7" r="1" fill="#f5a623" stroke="none" />
        </svg>
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

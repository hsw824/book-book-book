export function Chip({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={`h-10 cursor-pointer rounded-full border px-4.5 text-[15px] transition-colors duration-100 ease-in ${
        isActive
          ? 'border-blue-600 bg-blue-600/10 font-bold text-blue-600'
          : 'border-zinc-200 bg-white font-medium text-gray-600 hover:border-zinc-300'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

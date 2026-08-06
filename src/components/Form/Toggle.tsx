export function Toggle({ toggle, setToggle }: { toggle: boolean; setToggle: () => void }) {
  return (
    <div className={`${toggle ? 'bg-blue-500' : 'bg-zinc-200'} flex h-7.5 w-15 items-center rounded-[18px] p-1`}>
      <input type="checkbox" className="hidden" id="toggle" checked={toggle} onChange={setToggle} />
      <label
        htmlFor="toggle"
        className={`radius block h-5 w-5 cursor-pointer rounded-[50%] bg-white transition-all duration-200 ease-in ${toggle ? 'translate-x-[160%]' : ''}`}
      />
    </div>
  );
}

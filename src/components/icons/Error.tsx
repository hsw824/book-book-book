export function Error(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3.5c.36 0 .7.19.88.5l8.4 14.5a1 1 0 0 1-.87 1.5H3.6a1 1 0 0 1-.87-1.5l8.4-14.5c.18-.31.52-.5.87-.5Z" />
      <line x1="12" y1="9.5" x2="12" y2="13.8" />
      <circle cx="12" cy="16.7" r="1" fill="#f5a623" stroke="none" />
    </svg>
  );
}

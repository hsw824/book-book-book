import { createPortal } from 'react-dom';

export function Portal({ open, children }: { open: boolean; children: React.ReactNode }) {
  const portal = document.getElementById('portal');
  if (!portal) return null;

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-gray-400/50">{children}</div>,
    portal
  );
}

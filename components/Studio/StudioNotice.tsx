interface StudioNoticeProps {
  tone: 'warning' | 'error' | 'success';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const toneClasses = {
  warning: 'border-amber-300/25 bg-amber-300/[.07] text-amber-100',
  error: 'border-red-400/25 bg-red-400/[.08] text-red-100',
  success: 'border-emerald-400/20 bg-emerald-400/[.06] text-emerald-100',
} as const;

export default function StudioNotice({ tone, title, message, actionLabel, onAction }: StudioNoticeProps) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-lg border p-3 text-xs ${toneClasses[tone]}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 leading-5 opacity-65">{message}</p>
      {actionLabel && onAction && <button type="button" onClick={onAction} className="mt-2 rounded-md border border-current/25 px-2.5 py-1.5 text-[10px] font-semibold transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">{actionLabel}</button>}
    </div>
  );
}

import { CheckCircle2, XCircle, X } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';
import { cn } from '@/lib/cn';

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-lg border bg-white p-3 shadow-card',
            toast.tone === 'success' ? 'border-success/30' : 'border-danger/30',
          )}
        >
          {toast.tone === 'success' ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
          ) : (
            <XCircle className="h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
          )}
          <p className="flex-1 text-sm text-ink-primary">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            aria-label="Dismiss notification"
            className="rounded p-0.5 text-ink-tertiary hover:bg-grey-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}

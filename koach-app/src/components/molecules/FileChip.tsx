import { FileText, Eye } from 'lucide-react';

interface FileChipProps {
  readonly name: string;
  readonly size: string;
  readonly onView?: () => void;
}

export function FileChip({ name, size, onView }: FileChipProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-grey-300 bg-white px-3 py-2">
      <FileText className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-primary">{name}</p>
        <p className="text-xs text-ink-tertiary">{size}</p>
      </div>
      <button
        type="button"
        onClick={onView}
        aria-label={`Preview ${name}`}
        className="rounded-md p-1 text-ink-tertiary hover:bg-grey-100 hover:text-ink-secondary"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

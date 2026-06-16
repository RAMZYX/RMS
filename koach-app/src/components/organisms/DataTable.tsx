import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface Column<T> {
  readonly key: string;
  readonly header: string;
  readonly align?: 'left' | 'right' | 'center';
  readonly render: (row: T) => ReactNode;
}

interface DataTableProps<T extends { readonly id: string }> {
  readonly columns: ReadonlyArray<Column<T>>;
  readonly rows: ReadonlyArray<T>;
  readonly caption: string;
}

const alignClass: Readonly<Record<'left' | 'right' | 'center', string>> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

/**
 * Generic table. Rows are keyed by their stable `id` (never index).
 * For datasets larger than 50 rows a virtualized variant should be used;
 * the curation datasets here are small and render directly.
 */
export function DataTable<T extends { readonly id: string }>({
  columns,
  rows,
  caption,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface-card shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-grey-50">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-secondary',
                  alignClass[col.align ?? 'left'],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0 hover:bg-grey-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn('px-4 py-3 text-ink-primary', alignClass[col.align ?? 'left'])}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

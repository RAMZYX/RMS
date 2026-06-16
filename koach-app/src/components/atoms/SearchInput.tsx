import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-tertiary"
        aria-hidden="true"
      />
      <input
        ref={ref}
        type="search"
        className={cn(
          'h-9 w-full rounded-md border border-grey-300 bg-white pl-9 pr-3 text-sm text-ink-primary placeholder:text-ink-tertiary focus:border-brand',
          className,
        )}
        {...rest}
      />
    </div>
  );
});

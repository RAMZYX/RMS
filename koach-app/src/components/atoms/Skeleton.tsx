import { cn } from '@/lib/cn';

interface SkeletonProps {
  readonly className?: string;
}

/** Skeleton primitive — loading states use skeletons only, never blank screens. */
export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-grey-200', className)} />;
}

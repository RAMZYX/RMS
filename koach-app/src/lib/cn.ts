/** Tiny className combiner (keeps conditional class logic readable). */
export function cn(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

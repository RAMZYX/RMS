import type { BadgeKind } from '../data/mock';

const LABEL: Record<Exclude<BadgeKind, null>, string> = {
  registrant: 'Registrant',
  dependent: 'Dependent',
  caregiver: 'Caregiver',
};

export function Badge({ kind }: { kind: BadgeKind }) {
  if (!kind) return null;
  return <span className={`badge ${kind}`}>{LABEL[kind]}</span>;
}

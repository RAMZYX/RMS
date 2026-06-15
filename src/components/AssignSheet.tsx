import { useEffect, useState } from 'react';
import { MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import { Avatar } from './Avatar';
import type { FamilyMember } from '../data/mock';

type Props = {
  open: boolean;
  title: string;
  subtitle: string;
  candidates: FamilyMember[];
  confirmLabel: string;
  onClose: () => void;
  onConfirm: (memberId: string) => void;
};

/** Bottom-sheet to assign a guardian / caregiver to a dependent member. */
export function AssignSheet({
  open,
  title,
  subtitle,
  candidates,
  confirmLabel,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSelected(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <h2 className="sheet-title">{title}</h2>
        <p className="sheet-sub">{subtitle}</p>
        <div className="sheet-list">
          {candidates.map((m) => {
            const on = selected === m.id;
            return (
              <button
                key={m.id}
                className={`sheet-option${on ? ' on' : ''}`}
                onClick={() => setSelected(m.id)}
              >
                <Avatar initials={m.initials} size={36} />
                <span className="info">
                  <span className="nm">{m.name}</span>
                  <span className="sb">
                    {m.relationship} · Age {m.age}
                  </span>
                </span>
                <span className="radio">
                  {on ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
                </span>
              </button>
            );
          })}
        </div>
        <button
          className="sheet-confirm"
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

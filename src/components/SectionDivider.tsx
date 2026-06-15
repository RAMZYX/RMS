type Props = { label: string; align?: 'center' | 'left' };

export function SectionDivider({ label, align = 'center' }: Props) {
  return (
    <div className="divider">
      {align === 'center' && <span className="line left" />}
      <span className="label">{label}</span>
      <span className="line right" />
    </div>
  );
}

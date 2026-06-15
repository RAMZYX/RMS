type Props = {
  caption: string;
  title: string;
  buttonLabel: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function StickyCTA({ caption, title, buttonLabel, onClick, disabled }: Props) {
  return (
    <div className="sticky-cta">
      <div className="cta-card">
        <div className="cta-text">
          <div className="cta-caption">{caption}</div>
          <div className="cta-title">{title}</div>
        </div>
        <button className="cta-button" onClick={onClick} disabled={disabled}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

type Props = { initials: string; size?: number };

export function Avatar({ initials, size = 36 }: Props) {
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.39 }}
    >
      {initials}
    </span>
  );
}

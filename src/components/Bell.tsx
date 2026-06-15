import { MdNotificationsNone } from 'react-icons/md';

type Props = { count?: number; color?: string; onClick?: () => void };

export function Bell({ count = 0, color = 'var(--green)', onClick }: Props) {
  return (
    <button className="bell" onClick={onClick} aria-label="Notifications">
      <MdNotificationsNone color={color} />
      {count > 0 && <span className="bell-badge">{count}</span>}
    </button>
  );
}

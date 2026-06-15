import { Logo } from './Logo';
import { Bell } from './Bell';

type Props = { notifications?: number; onBell?: () => void };

/** White top bar: ITS logo left, notification bell right. */
export function TopBar({ notifications = 0, onBell }: Props) {
  return (
    <div className="topbar">
      <Logo width={37} height={58} />
      <Bell count={notifications} onClick={onBell} />
    </div>
  );
}

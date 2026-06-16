import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/organisms/Sidebar';

/** App chrome: persistent sidebar + routed content region. */
export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-page">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

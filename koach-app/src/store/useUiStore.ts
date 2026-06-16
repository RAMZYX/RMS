import { create } from 'zustand';

/** Client-only UI flags (Zustand is used for UI state ONLY, never server data). */
interface UiState {
  readonly sidebarCollapsed: boolean;
  readonly toggleSidebar: () => void;
  readonly setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set(() => ({ sidebarCollapsed: collapsed })),
}));

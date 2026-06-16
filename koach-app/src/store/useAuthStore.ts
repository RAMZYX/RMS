import { create } from 'zustand';
import type { AuthUser } from '@/types/common';

/** Authentication / current-user state (client state — Zustand). */
interface AuthState {
  readonly user: AuthUser;
}

export const useAuthStore = create<AuthState>(() => ({
  user: {
    id: 'usr_001',
    name: 'Santhosh Kumar',
    role: 'Hospital admin',
    avatarColor: '#962067',
  },
}));

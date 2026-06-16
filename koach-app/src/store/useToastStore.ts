import { create } from 'zustand';

export type ToastTone = 'success' | 'error';

export interface Toast {
  readonly id: string;
  readonly tone: ToastTone;
  readonly message: string;
}

interface ToastState {
  readonly toasts: ReadonlyArray<Toast>;
  readonly push: (tone: ToastTone, message: string) => void;
  readonly dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (tone, message) => {
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    set((state) => ({ toasts: [...state.toasts, { id, tone, message }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

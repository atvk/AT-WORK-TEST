import { create } from 'zustand';
import type { UserStatus } from '../types/types';

interface UserState {
  userStatuses: Record<number, UserStatus>;
  setUserStatus: (userId: number, status: UserStatus) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userStatuses: {},
  setUserStatus: (userId, status) =>
    set((state) => ({
      userStatuses: { ...state.userStatuses, [userId]: status },
    })),
  reset: () => set({ userStatuses: {} }),
}));
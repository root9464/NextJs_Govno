import { User } from '@nextui-org/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  password: string;
};

type Actions = {
  user: User;
  setUser: (user: User) => void;
};

export const useUserStore = create(
  persist<Actions>(
    (set) => ({
      user: { id: '', name: '', password: '' },
      setUser: (newUser) => set({ user: newUser }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

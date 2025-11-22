import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_token';

type User = { id: string; email: string; name: string };

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  clearToken: () => Promise<void>;
};

const zustandSecureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      setToken: async (token: string) => {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
      },
      getToken: async () => {
        return await SecureStore.getItemAsync(TOKEN_KEY);
      },
      clearToken: async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandSecureStorage),
    }
  )
);

export default useUserStore;
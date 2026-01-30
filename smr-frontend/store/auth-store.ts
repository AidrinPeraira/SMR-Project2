import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthStore = {
  access_token: string | null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      access_token: null,
      setAccessToken: (token) =>
        set({ access_token: token }, false, "auth/setAccessToken"),
      clearAccessToken: () =>
        set({ access_token: null }, false, "auth/clearAccessToken"),
    }),
    { name: "AuthStore" },
  ),
);

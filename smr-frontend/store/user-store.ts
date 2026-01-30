import { UserRoles } from "@smr/shared";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserData = {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  profile_image: string;
  user_role: UserRoles;
};

type UserStore = {
  user: UserData | null;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userData: UserData) =>
          set({ user: userData }, false, "user/setUser"),
        clearUser: () => set({ user: null }, false, "user/clearUser"),
      }),
      {
        name: "user-storage",
      },
    ),
    { name: "UserStore" },
  ),
);

export default useUserStore;

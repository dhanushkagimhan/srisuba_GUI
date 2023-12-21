import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AdminState = {
  email?: string;
  setEmail: (values: string) => void;
};

const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set) => ({
        email: undefined,
        setEmail: (values) => set(() => ({ email: values })),
      }),
      {
        name: "admin-storage",
      },
    ),
  ),
);

export default useAdminStore;

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { MarketerStatusEnum } from "../../utility/typesAndEnum";

export type MarketerData = {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  status?: MarketerStatusEnum;
  accountBalance?: number;
  affiliateCode?: string | null;
};

type MarketerState = {
  data?: MarketerData;
  setData: (values: MarketerData) => void;
};

const useMarketerStore = create<MarketerState>()(
  devtools(
    persist(
      (set) => ({
        data: undefined,
        setData: (values) => set(() => ({ data: values })),
      }),
      {
        name: "marketer-storage",
      },
    ),
  ),
);

export default useMarketerStore;

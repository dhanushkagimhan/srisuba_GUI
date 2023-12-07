import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { MainLayoutNavEnum } from "../../utility/types";

type MainLayoutData = {
  navMenu?: MainLayoutNavEnum;
  showFooter: boolean;
  showMarketing: boolean;
};

type MainLayoutState = {
  data: MainLayoutData;
  setData: (values: MainLayoutData) => void;
};

const useMainLayOutStore = create<MainLayoutState>()(
  devtools(
    persist(
      (set) => ({
        data: {
          navMenu: MainLayoutNavEnum.postProposer,
          showFooter: false,
          showMarketing: false,
        },
        setData: (values) => set(() => ({ data: values })),
      }),
      {
        name: "MainLayout-storage",
      },
    ),
  ),
);

export default useMainLayOutStore;

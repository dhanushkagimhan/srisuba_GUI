import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ProposerStatusEnum } from "../../utility/types";

type ProposerData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  status: ProposerStatusEnum;
  membershipExpiration: Date;
};

type ProposerState = {
  data?: ProposerData;
  setData: (values: ProposerData) => void;
};

const useProposerStore = create<ProposerState>()(
  devtools(
    persist(
      (set) => ({
        data: undefined,
        setData: (values) => set(() => ({ data: values })),
      }),
      {
        name: "proposer-storage",
      },
    ),
  ),
);

export default useProposerStore;

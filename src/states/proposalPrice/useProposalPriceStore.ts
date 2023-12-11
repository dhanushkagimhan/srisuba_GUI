import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ProposalPriceState = {
  price?: number;
  setPrice: (values: number) => void;
};

const useProposalPriceStore = create<ProposalPriceState>()(
  devtools(
    persist(
      (set) => ({
        price: undefined,
        setPrice: (value) => set(() => ({ price: value })),
      }),
      {
        name: "proposal-price-storage",
      },
    ),
  ),
);

export default useProposalPriceStore;

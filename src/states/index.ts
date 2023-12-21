import useAdminStore from "./admin/useAdminStore";
import useMainLayoutStore from "./mainLayout/useMainLayoutStore";
import useMarketerStore, { MarketerData } from "./marketer/useMarketerStore";
import useProposalPriceStore from "./proposalPrice/useProposalPriceStore";
import useProposerStore, { ProposerData } from "./proposer/useProposerStore";

export {
  useMainLayoutStore,
  useProposerStore,
  useProposalPriceStore,
  useMarketerStore,
  useAdminStore,
};
export type { ProposerData, MarketerData };

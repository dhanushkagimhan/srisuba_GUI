import { useMutation, useQuery } from "@tanstack/react-query";
import { useProposerAuthClient } from "../../client";
import {
  ProposerProposalType,
  ProposerStatusEnum,
} from "../../../utility/typesAndEnum";
import { useProposerStore } from "../../../states";

export function useProposerProposalCreateOrUpdate() {
  const proposerAuthClient = useProposerAuthClient();

  return useMutation({
    mutationFn: (proposalData: ProposerProposalType) => {
      return proposerAuthClient.post("/proposal", proposalData);
    },
  });
}

export function useProposerProposalGetBlockReason() {
  const proposerAuthClient = useProposerAuthClient();
  const proposerState = useProposerStore();

  return useQuery({
    queryKey: ["proposer-proposal-block-reason"],
    queryFn: () => {
      return proposerAuthClient.get("/proposal/block-reason");
    },
    enabled:
      proposerState.data?.status === ProposerStatusEnum.Rejected ||
      proposerState.data?.status === ProposerStatusEnum.Banned,
  });
}

export function useProposerGetMyProposal() {
  const proposerAuthClient = useProposerAuthClient();
  const proposerState = useProposerStore();

  return useQuery({
    queryKey: ["proposer-get-my-proposal"],
    queryFn: () => {
      return proposerAuthClient.get("/proposal/my");
    },
    enabled: proposerState.data?.status !== ProposerStatusEnum.EmailVerified,
  });
}

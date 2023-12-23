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
    queryKey: [],
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
    queryKey: [],
    queryFn: () => {
      return proposerAuthClient.get("/proposal/my");
    },
    enabled: proposerState.data?.status !== ProposerStatusEnum.EmailVerified,
  });
}

export function useProposerGetOtherProposers(
  pageNumber: number = 1,
  pageSize: number = 10,
) {
  const proposerAuthClient = useProposerAuthClient();

  return useQuery({
    queryKey: [pageNumber, pageSize],
    queryFn: () => {
      return proposerAuthClient.get(
        `/m/proposal?pageSize=${pageSize}&page=${pageNumber}`,
      );
    },
  });
}

export function useProposerGetOtherProposal(
  otherProposerId: number | undefined,
) {
  const proposerAuthClient = useProposerAuthClient();

  return useQuery({
    queryKey: [otherProposerId],
    queryFn: () => {
      return proposerAuthClient.get(`/m/proposal/${otherProposerId}`);
    },
    enabled: otherProposerId != null,
  });
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { useProposerAuthClient } from "../../client";
import { ProposerProposalType } from "../../../utility/typesAndEnum";

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

  return useQuery({
    queryKey: ["proposer-proposal-block-reason"],
    queryFn: () => {
      return proposerAuthClient.get("/proposal/block-reason");
    },
  });
}

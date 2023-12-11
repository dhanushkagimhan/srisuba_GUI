import { useMutation } from "@tanstack/react-query";
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

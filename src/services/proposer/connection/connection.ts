import { useMutation, useQuery } from "@tanstack/react-query";
import { useProposerAuthClient } from "../../client";
import { ProposerProposeType } from "../../../utility/typesAndEnum";

export function useProposerPropose() {
  const proposerAuthClient = useProposerAuthClient();

  return useMutation({
    mutationFn: (proposeData: ProposerProposeType) => {
      return proposerAuthClient.post("/m/connection/send-request", proposeData);
    },
  });
}

export function useProposerGetMatchedProposers() {
  const proposerAuthClient = useProposerAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return proposerAuthClient.get(`/m/connection/partners`);
    },
  });
}

export function useProposerGetReceivedProposers() {
  const proposerAuthClient = useProposerAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return proposerAuthClient.get(`/m/connection/received-requests`);
    },
  });
}

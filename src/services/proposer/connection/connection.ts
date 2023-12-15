import { useMutation } from "@tanstack/react-query";
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

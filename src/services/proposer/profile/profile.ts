import { useMutation } from "@tanstack/react-query";
import { useProposerAuthClient } from "../../client";
import { ProposerEditProfileType } from "../../../utility/typesAndEnum";

export function useProposerProfileEdit() {
  const proposerAuthClient = useProposerAuthClient();

  return useMutation({
    mutationFn: (proposerProfileData: ProposerEditProfileType) => {
      return proposerAuthClient.put("/profile", proposerProfileData);
    },
  });
}

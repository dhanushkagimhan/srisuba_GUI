import { useMutation } from "@tanstack/react-query";
import { useProposerAuthClient } from "../../client";
import {
  ProposerChangePasswordType,
  ProposerEditProfileType,
} from "../../../utility/typesAndEnum";

export function useProposerProfileEdit() {
  const proposerAuthClient = useProposerAuthClient();

  return useMutation({
    mutationFn: (proposerProfileData: ProposerEditProfileType) => {
      return proposerAuthClient.put("/profile", proposerProfileData);
    },
  });
}

export function useProposerChangePassword() {
  const proposerAuthClient = useProposerAuthClient();

  return useMutation({
    mutationFn: (proposerChangePasswordData: ProposerChangePasswordType) => {
      return proposerAuthClient.post(
        "/profile/change-password",
        proposerChangePasswordData,
      );
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useMarketerAuthClient } from "../../client";
import {
  MarketerChangePasswordType,
  MarketerEditProfileType,
} from "../../../utility/typesAndEnum";

export function useMarketerProfileEdit() {
  const marketerAuthClient = useMarketerAuthClient();

  return useMutation({
    mutationFn: (profileEditData: MarketerEditProfileType) => {
      return marketerAuthClient.put("/profile", profileEditData);
    },
  });
}

export function useMarketerChangePassword() {
  const marketerAuthClient = useMarketerAuthClient();

  return useMutation({
    mutationFn: (changePasswordData: MarketerChangePasswordType) => {
      return marketerAuthClient.post(
        "/profile/change-password",
        changePasswordData,
      );
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { useMarketerAuthClient } from "../../client";
import { MarketerEditProfileType } from "../../../utility/typesAndEnum";

export function useMarketerProfileEdit() {
  const marketerAuthClient = useMarketerAuthClient();

  return useMutation({
    mutationFn: (profileEditData: MarketerEditProfileType) => {
      return marketerAuthClient.put("/profile", profileEditData);
    },
  });
}

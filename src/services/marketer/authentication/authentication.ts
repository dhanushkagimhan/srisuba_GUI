import { useMutation } from "@tanstack/react-query";
import { marketerClient } from "../../client";
import { MarketerLoginType } from "../../../utility/typesAndEnum";

export function useMarketerLogin() {
  return useMutation({
    mutationFn: (loginData: MarketerLoginType) => {
      return marketerClient.post("/login", loginData);
    },
  });
}

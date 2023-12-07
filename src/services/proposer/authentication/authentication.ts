import { useMutation } from "@tanstack/react-query";
import { proposerClient } from "../../client";
import { ProposerLoginType } from "../../../utility/types";

export default function useProposerLogin() {
  return useMutation({
    mutationFn: (loginData: ProposerLoginType) => {
      return proposerClient.post("/login", loginData);
    },
  });
}

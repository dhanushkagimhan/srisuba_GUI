import { useMutation } from "@tanstack/react-query";
import { proposerClient } from "../../client";
import {
  ProposerLoginType,
  ProposerRegisterType,
} from "../../../utility/types";

export function useProposerLogin() {
  return useMutation({
    mutationFn: (loginData: ProposerLoginType) => {
      return proposerClient.post("/login", loginData);
    },
  });
}

export function useProposerRegister() {
  return useMutation({
    mutationFn: (registerData: ProposerRegisterType) => {
      return proposerClient.post("/register", registerData);
    },
  });
}

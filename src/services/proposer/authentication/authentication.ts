import { useMutation } from "@tanstack/react-query";
import { proposerClient } from "../../client";
import {
  ProposerEmailVerifyType,
  ProposerLoginType,
  ProposerRegenEmailVerifyType,
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

export function useProposerEmailVerify() {
  return useMutation({
    mutationFn: (emailVerifyData: ProposerEmailVerifyType) => {
      return proposerClient.post("/email-verify", emailVerifyData);
    },
  });
}

export function useProposerRegenEmailVerify() {
  return useMutation({
    mutationFn: (regenEmailVerifyData: ProposerRegenEmailVerifyType) => {
      return proposerClient.post("/regen-email-verify", regenEmailVerifyData);
    },
  });
}

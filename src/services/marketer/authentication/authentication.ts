import { useMutation } from "@tanstack/react-query";
import { marketerClient } from "../../client";
import {
  MarketerEmailVerifyType,
  MarketerLoginType,
  MarketerRegisterType,
} from "../../../utility/typesAndEnum";

export function useMarketerLogin() {
  return useMutation({
    mutationFn: (loginData: MarketerLoginType) => {
      return marketerClient.post("/login", loginData);
    },
  });
}

export function useMarketerRegister() {
  return useMutation({
    mutationFn: (registerData: MarketerRegisterType) => {
      return marketerClient.post("/register", registerData);
    },
  });
}

export function useMarketerEmailVerify() {
  return useMutation({
    mutationFn: (emailVerifyData: MarketerEmailVerifyType) => {
      return marketerClient.post("/email-verify", emailVerifyData);
    },
  });
}

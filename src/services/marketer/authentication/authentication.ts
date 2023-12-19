import { useMutation } from "@tanstack/react-query";
import { marketerClient } from "../../client";
import {
  MarketerEmailVerifyType,
  MarketerForgotPasswordType,
  MarketerLoginType,
  MarketerRegenEmailVerifyType,
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

export function useMarketerRegenEmailVerify() {
  return useMutation({
    mutationFn: (regenEmailVerifyData: MarketerRegenEmailVerifyType) => {
      return marketerClient.post("/regen-email-verify", regenEmailVerifyData);
    },
  });
}

export function useMarketerForgotPassword() {
  return useMutation({
    mutationFn: (forgotPasswordData: MarketerForgotPasswordType) => {
      return marketerClient.post("/forgot-password", forgotPasswordData);
    },
  });
}

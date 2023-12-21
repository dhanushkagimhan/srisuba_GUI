import { useMutation } from "@tanstack/react-query";
import {
  AdminLoginVerifyType,
  AdminLoginType,
} from "../../../utility/typesAndEnum";
import { adminClient } from "../../client";

export function useAdminLogin() {
  return useMutation({
    mutationFn: (loginData: AdminLoginType) => {
      return adminClient.post("/login", loginData);
    },
  });
}

export function useAdminLoginVerify() {
  return useMutation({
    mutationFn: (loginVerifyData: AdminLoginVerifyType) => {
      return adminClient.post("/login-verify", loginVerifyData);
    },
  });
}

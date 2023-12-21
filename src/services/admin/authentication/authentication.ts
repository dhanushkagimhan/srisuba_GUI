import { useMutation } from "@tanstack/react-query";
import { AdminLoginType } from "../../../utility/typesAndEnum";
import { adminClient } from "../../client";

export function useAdminLogin() {
  return useMutation({
    mutationFn: (loginData: AdminLoginType) => {
      return adminClient.post("/login", loginData);
    },
  });
}

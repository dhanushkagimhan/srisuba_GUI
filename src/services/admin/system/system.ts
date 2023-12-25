import { useMutation, useQuery } from "@tanstack/react-query";
import { useAdminAuthClient } from "../../client";
import { AdminWithdrawSystemIncomeType } from "../../../utility/typesAndEnum";

export function useAdminGetSystemDetails() {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return adminAuthClient.get("/system");
    },
  });
}

export function useAdminWithdrawSystemIncome() {
  const adminAuthClient = useAdminAuthClient();

  return useMutation({
    mutationFn: (withdrawData: AdminWithdrawSystemIncomeType) => {
      return adminAuthClient.post("/system/withdraw", withdrawData);
    },
  });
}

export function useAdminGetSystemWithdrawals() {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return adminAuthClient.get("/system/withdrawals");
    },
  });
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAdminAuthClient } from "../../client";
import { AdminWithdrawMarketerIncomeType } from "../../../utility/typesAndEnum";

export function useAdminGetMarketers(
  pageNumber: number = 1,
  pageSize: number = 10,
  isOnlyWithdrawAvailable: boolean = false,
  orderDesc: boolean = false,
) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [pageNumber, pageSize, isOnlyWithdrawAvailable, orderDesc],
    queryFn: () => {
      return adminAuthClient.get(
        `/marketer?isOnlyWithdrawAvailable=${isOnlyWithdrawAvailable}&orderDesc=${orderDesc}&pageSize=${pageSize}&page=${pageNumber}`,
      );
    },
  });
}

export function useAdminGetMarketerReferredProposers(
  isQueryEnable: boolean,
  pageNumber: number = 1,
  pageSize: number = 10,
  marketerId?: number,
) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [pageNumber, pageSize, marketerId, isQueryEnable],
    queryFn: () => {
      return adminAuthClient.get(
        `/marketer/proposers/${marketerId}?pageSize=${pageSize}&page=${pageNumber}`,
      );
    },
    enabled: isQueryEnable,
  });
}

export function useAdminGetMarketerWithdrawals(
  isQueryEnable: boolean,
  marketerId?: number,
) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [marketerId, isQueryEnable],
    queryFn: () => {
      return adminAuthClient.get(`/marketer/withdrawals/${marketerId}`);
    },
    enabled: isQueryEnable,
  });
}

export function useAdminGetMarketerBankAccount(
  isQueryEnable: boolean,
  marketerId?: number,
) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [marketerId, isQueryEnable],
    queryFn: () => {
      return adminAuthClient.get(`/marketer/bank-acc/${marketerId}`);
    },
    enabled: isQueryEnable,
  });
}

export function useAdminWithdrawMarketerIncome() {
  const adminAuthClient = useAdminAuthClient();

  return useMutation({
    mutationFn: (withdrawData: AdminWithdrawMarketerIncomeType) => {
      return adminAuthClient.post("/marketer/withdraw", withdrawData);
    },
  });
}

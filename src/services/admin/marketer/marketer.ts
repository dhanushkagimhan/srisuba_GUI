import { useQuery } from "@tanstack/react-query";
import { useAdminAuthClient } from "../../client";

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

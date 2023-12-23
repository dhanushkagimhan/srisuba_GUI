import { useQuery } from "@tanstack/react-query";
import { useAdminAuthClient } from "../../client";
import { ProposerStatusEnum } from "../../../utility/typesAndEnum";

export function useAdminGetProposals(
  pageNumber: number = 1,
  pageSize: number = 10,
  proposerStatus: ProposerStatusEnum = ProposerStatusEnum.PendingPayment,
  isOnlyExpired: boolean = false,
  isIncludePayments: boolean = false,
  orderDesc: boolean = false,
) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [
      pageNumber,
      pageSize,
      proposerStatus,
      isOnlyExpired,
      isIncludePayments,
      orderDesc,
    ],
    queryFn: () => {
      return adminAuthClient.get(
        `/proposal?proposerStatus=${proposerStatus}&isOnlyExpired=${isOnlyExpired}&isIncludePayments=${isIncludePayments}&orderDesc=${orderDesc}&pageSize=${pageSize}&page=${pageNumber}`,
      );
    },
  });
}

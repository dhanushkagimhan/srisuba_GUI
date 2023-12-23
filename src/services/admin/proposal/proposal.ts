import { useMutation, useQuery } from "@tanstack/react-query";
import { useAdminAuthClient } from "../../client";
import {
  AdminApproveProposerPaymentType,
  AdminChangeProposerStatusType,
  ProposerStatusEnum,
} from "../../../utility/typesAndEnum";

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

export function useAdminGetProposal(proposerId: number | undefined) {
  const adminAuthClient = useAdminAuthClient();

  return useQuery({
    queryKey: [proposerId],
    queryFn: () => {
      return adminAuthClient.get(`/proposal/${proposerId}`);
    },
    enabled: proposerId != null,
  });
}

export function useAdminApproveProposerPayment() {
  const adminAuthClient = useAdminAuthClient();

  return useMutation({
    mutationFn: (approvePaymentData: AdminApproveProposerPaymentType) => {
      return adminAuthClient.post(
        "/proposal/approve-payment",
        approvePaymentData,
      );
    },
  });
}

export function useAdminChangeProposerStatus() {
  const adminAuthClient = useAdminAuthClient();

  return useMutation({
    mutationFn: (changeStatusData: AdminChangeProposerStatusType) => {
      return adminAuthClient.post("/proposal/change-status", changeStatusData);
    },
  });
}

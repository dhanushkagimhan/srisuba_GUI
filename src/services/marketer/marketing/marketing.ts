import { useMutation, useQuery } from "@tanstack/react-query";
import { useMarketerAuthClient } from "../../client";
import { MarketerCreateAffiliateCodeType } from "../../../utility/typesAndEnum";

export function useMarketerCreateAffiliateCode() {
  const marketerAuthClient = useMarketerAuthClient();

  return useMutation({
    mutationFn: (affiliateCodeData: MarketerCreateAffiliateCodeType) => {
      return marketerAuthClient.post(
        "/marketing/create-affiliate-code",
        affiliateCodeData,
      );
    },
  });
}

export function useMarketerGetAffiliatedProposers(
  pageNumber: number = 1,
  pageSize: number = 10,
) {
  const marketerAuthClient = useMarketerAuthClient();

  return useQuery({
    queryKey: [`${pageNumber}`, `${pageSize}`],
    queryFn: () => {
      return marketerAuthClient.get(
        `/marketing/affiliated-proposers?pageSize=${pageSize}&page=${pageNumber}`,
      );
    },
  });
}

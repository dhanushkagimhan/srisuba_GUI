import { useMutation } from "@tanstack/react-query";
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

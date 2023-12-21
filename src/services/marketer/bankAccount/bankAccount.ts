import { useMutation, useQuery } from "@tanstack/react-query";
import { useMarketerAuthClient } from "../../client";
import { MarketerBankAccountType } from "../../../utility/typesAndEnum";

export function useMarketerGetBankAccount(isBankAccountAvailable: boolean) {
  const marketerAuthClient = useMarketerAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return marketerAuthClient.get(`/bank-acc`);
    },
    enabled: isBankAccountAvailable,
  });
}

export function useMarketerCreateOrUpdateBankAccount() {
  const marketerAuthClient = useMarketerAuthClient();

  return useMutation({
    mutationFn: (bankAccountData: MarketerBankAccountType) => {
      return marketerAuthClient.post("/bank-acc", bankAccountData);
    },
  });
}

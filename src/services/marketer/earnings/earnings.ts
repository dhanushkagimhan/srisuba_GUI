import { useQuery } from "@tanstack/react-query";
import { useMarketerAuthClient } from "../../client";

export function useMarketerGetAccountBalance() {
  const marketerAuthClient = useMarketerAuthClient();

  return useQuery({
    queryKey: [],
    queryFn: () => {
      return marketerAuthClient.get(`/earnings/account-balance`);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { commonClient } from "../../client";

export function useProposalPrice() {
  return useQuery({
    queryKey: ["getProposalPrice"],
    queryFn: () => {
      return commonClient.get("/proposal/price");
    },
  });
}

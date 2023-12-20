import { useEffect } from "react";
import { useMarketerGetAccountBalance } from "../../../../../services/marketer";
import { useMarketerStore } from "../../../../../states";

export default function MarketerAccountBalance() {
  const marketerState = useMarketerStore();
  const marketerAccountBalanceQuery = useMarketerGetAccountBalance();

  useEffect(() => {
    loadMarketerAccountBalance();
  }, [marketerAccountBalanceQuery.data]);

  const loadMarketerAccountBalance = () => {
    if (marketerAccountBalanceQuery.isSuccess) {
      if (marketerAccountBalanceQuery.data.data.success) {
        if (marketerState.data != null) {
          const accountBalance: number =
            marketerAccountBalanceQuery.data.data.data.accountBalance;
          const marketerData = marketerState.data;
          marketerData.accountBalance = accountBalance;
          marketerState.setData(marketerData);
        }
      }
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="font-medium">Account balance : </div>
      <div>Rs. {marketerState.data?.accountBalance ?? ""} (LKR)</div>
    </div>
  );
}

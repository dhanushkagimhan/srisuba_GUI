import { message } from "antd";
import { useMarketerStore } from "../../../../../states";
import { useMarketerGetAccountBalance } from "../../../../../services/marketer";
import { useEffect } from "react";

export default function Home() {
  const marketerState = useMarketerStore();
  const [messageApi, contextHolder] = message.useMessage();
  const marketerAccountBalanceQuery = useMarketerGetAccountBalance();

  useEffect(() => {
    getMarketerAccountBalance();
  }, [marketerAccountBalanceQuery.data]);

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    messageApi.open({
      type: "success",
      content: "Copied to clipboard",
    });
  };

  const getMarketerAccountBalance = () => {
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
    <>
      {contextHolder}
      <div>
        <div className="flex min-[500px]:flex-row flex-col min-[500px]:justify-between gap-4">
          <div>
            <div>
              <p className="font-medium">Referral code</p>
              <div
                className="px-2 py-1  border-[1px] border-solid rounded-lg border-slate-400 text-center cursor-pointer"
                onClick={() =>
                  copyToClipBoard(marketerState.data?.affiliateCode ?? "")
                }
              >
                {marketerState.data?.affiliateCode ?? ""}
              </div>
            </div>
            <div>
              <p className="font-medium">Referral link</p>
              <div
                className="px-2 py-1  border-[1px] border-solid rounded-lg border-slate-400 text-center cursor-pointer"
                onClick={() =>
                  copyToClipBoard(
                    marketerState.data?.affiliateCode
                      ? "https://www.srisuba.com?r=" +
                          marketerState.data.affiliateCode
                      : "",
                  )
                }
              >
                {marketerState.data?.affiliateCode
                  ? "https://www.srisuba.com?r=" +
                    marketerState.data?.affiliateCode
                  : ""}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-medium">Account balance : </div>
            <div>Rs. {marketerState.data?.accountBalance ?? ""} (LKR)</div>
          </div>
        </div>
      </div>
    </>
  );
}

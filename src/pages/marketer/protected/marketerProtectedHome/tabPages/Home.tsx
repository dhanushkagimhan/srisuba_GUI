import { message } from "antd";
import { useMarketerStore } from "../../../../../states";
import { MarketerAccountBalance, MarketerAffiliatedProposers } from ".";

export default function Home() {
  const marketerState = useMarketerStore();
  const [messageApi, contextHolder] = message.useMessage();

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    messageApi.open({
      type: "success",
      content: "Copied to clipboard",
    });
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="flex min-[500px]:flex-row flex-col min-[500px]:justify-between gap-4">
          <div className="flex sm:flex-row flex-col sm:gap-12">
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
          <div>
            <MarketerAccountBalance />
          </div>
        </div>

        <div className="mt-8">
          <div className="font-semibold mb-4 text-lg">Affiliated Proposers</div>
          <MarketerAffiliatedProposers />
        </div>
      </div>
    </>
  );
}

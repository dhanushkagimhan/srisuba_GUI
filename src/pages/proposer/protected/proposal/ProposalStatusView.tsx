import { useEffect } from "react";
import {
  useMainLayoutStore,
  useProposalPriceStore,
  useProposerStore,
} from "../../../../states";
import { ProposerStatusEnum } from "../../../../utility/typesAndEnum";
import { systemContactNumber } from "../../../../utility/const";
import { BankAccount } from "../../../../utility/components";

export default function ProposalStatusView() {
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const proposalPriceState = useProposalPriceStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const statusView = () => {
    switch (proposerState.data?.status) {
      case ProposerStatusEnum.PendingPayment: {
        return (
          <div>
            <div className="font-semibold text-xl">
              You need to pay membership payment to publish the your proposal.
            </div>
            <div className="mt-4">
              Membership payment : Rs. {proposalPriceState.price ?? ""} (LKR)
              per 3 months,
            </div>
            <div className="mt-4">
              <ol>
                <li>
                  Transfer Rs. {proposalPriceState.price ?? ""} (LKR) to the
                  following bank account.
                </li>
                <li>
                  Send the transaction slip / screenshot with your email to the{" "}
                  {systemContactNumber} via whatsApp.
                </li>
              </ol>
            </div>
            <BankAccount />
          </div>
        );
      }
      default:
        return <div>Unexpected membership status, please login again.</div>;
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">{statusView()}</div>
    </div>
  );
}

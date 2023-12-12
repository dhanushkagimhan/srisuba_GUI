import { useEffect } from "react";
import {
  useMainLayoutStore,
  useProposalPriceStore,
  useProposerStore,
} from "../../../../states";
import {
  MainLayoutNavEnum,
  ProposerStatusEnum,
} from "../../../../utility/typesAndEnum";
import { systemContactNumber } from "../../../../utility/const";
import { BankAccount } from "../../../../utility/components";
import { useProposerProposalGetBlockReason } from "../../../../services/proposer";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ProposalStatusView() {
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const proposalPriceState = useProposalPriceStore();
  const proposalBlockReasonQuery = useProposerProposalGetBlockReason();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.proposerLogout,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const getProposalBlockReason = () => {
    if (proposalBlockReasonQuery.isSuccess) {
      if (proposalBlockReasonQuery.data.data.success) {
        return proposalBlockReasonQuery.data.data.data.reason;
      }
      return null;
    }
    return null;
  };

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
      case ProposerStatusEnum.PaymentApproved: {
        return (
          <div>
            <div className="font-semibold text-xl">
              Your membership payment was approved.
            </div>
            <div className="mt-8">
              Please wait until the review your proposal.
            </div>
          </div>
        );
      }
      case ProposerStatusEnum.Rejected: {
        return (
          <div>
            <div className="font-semibold text-xl">
              Your membership payment was approved.
            </div>
            <div className="mt-8">
              But when reviewing your proposal. we decided to reject proposal.
              For fix this you need to update your proposal again.
            </div>
            <div className="mt-8">
              Reject Reason : {getProposalBlockReason() ?? ""}
            </div>
            <div className="mt-8">
              <Button type="primary" onClick={() => navigate("/cu-proposal")}>
                Update Proposal
              </Button>
            </div>
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

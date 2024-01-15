import { useEffect } from "react";
import { useMainLayoutStore, useProposerStore } from "../../../../states";
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
    }
    return "";
  };

  const statusView = () => {
    switch (proposerState.data?.status) {
      case ProposerStatusEnum.PendingPayment: {
        return (
          <div>
            <div className="text-2xl font-semibold">
              Proposal creation successfully!
            </div>
            <div className="font-semibold mt-6">
              Now, To publish your proposal, you must make a membership payment.
            </div>
            <div className="mt-4">
              Membership payment is Rs. 1500 (LKR) per 3 months,
            </div>
            <div className="mt-4">
              <ol>
                <li>Transfer Rs. 1500 (LKR) to the following bank account.</li>
                <li>
                  Send the transaction slip / screenshot to the{" "}
                  {systemContactNumber} via whatsApp.
                </li>
              </ol>
              <div className="italic text-base text-pink-950">
                After completing your payment, we will review and approve your
                proposal. Once approved, you can log in to srisuba.com and
                browse through suitable proposals. Then, you can find and
                propose to your dream partner. Good luck!
              </div>
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
              But when reviewing your proposal, we decided to reject your
              proposal. For fix this you need to update your proposal again.
            </div>
            <div className="mt-8">
              Reject Reason : {getProposalBlockReason()}
            </div>
            <div className="mt-8">
              <Button type="primary" onClick={() => navigate("/cu-proposal")}>
                Update Proposal
              </Button>
            </div>
          </div>
        );
      }
      case ProposerStatusEnum.RejectionResolved: {
        return (
          <div>
            <div className="font-semibold text-xl">
              Your membership payment was approved.
            </div>
            <div className="mt-8">
              Please wait until the review your updated proposal.
            </div>
          </div>
        );
      }
      case ProposerStatusEnum.Banned: {
        return (
          <div>
            <div className="font-semibold text-xl">
              Your proposal was Banned.
            </div>
            <div className="mt-8">
              When reviewing your proposal, we decided to banned your proposal.
              For fix this you need to update your proposal again.
            </div>
            <div className="mt-8">
              Banned Reason : {getProposalBlockReason()}
            </div>
            <div className="mt-8">
              <Button type="primary" onClick={() => navigate("/cu-proposal")}>
                Update Proposal
              </Button>
            </div>
          </div>
        );
      }
      case ProposerStatusEnum.BannedResolved: {
        return (
          <div>
            <div className="font-semibold text-xl">
              We reviewing your banned resolved proposal.
            </div>
            <div className="mt-8">
              Please wait until the review your updated proposal.
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

import { Modal, Image, Skeleton, Alert } from "antd";
import {
  ProposerOtherProposalType,
  ProposerOtherProposerType,
} from "../../../../../../utility/typesAndEnum";
import { useProposerGetOtherProposal } from "../../../../../../services/proposer";
import { useEffect, useState } from "react";

type OtherProposalViewModelProp = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  otherProposer?: Partial<ProposerOtherProposerType>;
};

export default function OtherProposalViewModel(
  prop: OtherProposalViewModelProp,
) {
  const otherProposalQuery = useProposerGetOtherProposal(
    prop.otherProposer?.id,
  );
  const [otherProposalData, setOtherProposalData] =
    useState<ProposerOtherProposalType>();

  useEffect(() => {
    loadOtherProposalData();
  }, [otherProposalQuery.isSuccess]);

  const loadOtherProposalData = () => {
    if (otherProposalQuery.isSuccess) {
      if (otherProposalQuery.data.data.success) {
        setOtherProposalData(otherProposalQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (otherProposalQuery.isPending) {
      return <Skeleton active />;
    } else if (otherProposalQuery.isError) {
      return (
        <div>
          <Alert message="Proposal data loading Error" type="error" />
        </div>
      );
    } else if (otherProposalQuery.isSuccess) {
      return (
        <div>
          <div className="flex flex-row justify-center">
            <div className="w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] flex justify-center items-center">
              <Image
                className="max-w-[250px] lg:max-w-[300px] h-[250px] lg:max-h-[300px]"
                src={otherProposalData?.profilePhoto}
                alt="Profile photo"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <span className="capitalize text-2xl font-semibold">
              {prop.otherProposer?.firstName +
                " " +
                prop.otherProposer?.lastName}
            </span>
            <div className="w-full h-[2px] bg-slate-200 rounded-lg my-2"></div>
          </div>
        </div>
      );
    }
  };

  return (
    <Modal
      open={prop.isModalOpen}
      onCancel={() => prop.setIdModelOpen(false)}
      okButtonProps={{ className: "hidden" }}
      width={1000}
    >
      <div className="my-8 p-4">{getContent()}</div>
    </Modal>
  );
}

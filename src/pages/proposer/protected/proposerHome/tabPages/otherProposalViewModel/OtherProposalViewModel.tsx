import { Modal, Image, Skeleton } from "antd";
import {
  ProposerOtherProposalType,
  ProposerOtherProposerType,
} from "../../../../../../utility/typesAndEnum";
import { useProposerGetOtherProposal } from "../../../../../../services/proposer";
import { useEffect, useState } from "react";
import { getCountryLabel } from "../../../../../../utility/Methods";

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
            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">
                Personal Information
              </span>
              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Basic</span>
                <div className="bg-sl flex flex-row gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Ethnicity :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.ethnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.religion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Age :{" "}
                      </div>
                      <div className="w-full">{otherProposalData?.age}</div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Caste :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.caste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Civil Status :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.civilStatus}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Height :{" "}
                      </div>
                      <div className="w-full">{otherProposalData?.height}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Residency</span>
                <div className="bg-sl flex flex-row gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.country
                          ? getCountryLabel(otherProposalData.country)
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        State / District :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.stateOrDistrict}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        City :{" "}
                      </div>
                      <div className="w-full">{otherProposalData?.city}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Education and Profession</span>
                <div className="bg-sl flex flex-row gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Education :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.education}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Profession :{" "}
                      </div>
                      <div className="w-full">
                        {otherProposalData?.profession}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <div className="my-8 p-4 max-h-[65vh] overflow-y-auto">
        {getContent()}
      </div>
    </Modal>
  );
}

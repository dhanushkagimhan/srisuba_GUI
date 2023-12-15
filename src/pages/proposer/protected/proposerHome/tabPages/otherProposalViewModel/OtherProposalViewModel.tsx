import { Modal, Image, Skeleton, Alert } from "antd";
import {
  ProposerFoodPreferenceEnum,
  ProposerMatchingProposalStatusEnum,
  ProposerOtherProposalType,
  ProposerOtherProposerType,
  ProposerProposeType,
} from "../../../../../../utility/typesAndEnum";
import {
  useProposerGetOtherProposal,
  useProposerPropose,
} from "../../../../../../services/proposer";
import { useEffect, useState } from "react";
import {
  getCountryLabel,
  getMutationError,
} from "../../../../../../utility/Methods";
import dayjs from "dayjs";
import { SyncOutlined } from "@ant-design/icons";

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
  const proposerProposeMutation = useProposerPropose();

  useEffect(() => {
    loadOtherProposalData();
  }, [otherProposalQuery]);

  const loadOtherProposalData = () => {
    if (otherProposalQuery.isSuccess) {
      if (otherProposalQuery.data.data.success) {
        setOtherProposalData(otherProposalQuery.data.data.data);
      }
    }
  };

  const onPropose = () => {
    if (prop.otherProposer?.id != null) {
      const proposeData: ProposerProposeType = {
        proposerId: prop.otherProposer.id,
      };
      proposerProposeMutation.mutate(proposeData, {
        onSuccess: (data) => {
          if (data.data.success) {
            otherProposalQuery.refetch();
          }
        },
      });
    }
  };

  const getRespondContent = () => {
    if (otherProposalData?.connection == null) {
      return (
        <div>
          <span className="font-semibold">
            If you interest about this proposal, You can propose.
          </span>
          <div>
            {proposerProposeMutation.isError ? (
              <div className="xl:w-3/5 w-full my-4">
                <Alert
                  message={getMutationError(proposerProposeMutation)}
                  type="error"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="my-4 sm:pl-8">
            <div
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 sm:px-10 rounded-lg font-semibold w-fit cursor-pointer"
              onClick={onPropose}
            >
              {proposerProposeMutation.isPending ? (
                <span className="mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Propose
            </div>
          </div>
        </div>
      );
    } else if (
      otherProposalData?.connection.status ===
      ProposerMatchingProposalStatusEnum.Pending
    ) {
      return (
        <div>
          <span className="font-semibold">
            Wait for the review your proposal.
          </span>
          <div className="my-4 sm:pl-8">
            <div className="bg-gray-600  text-white py-2 px-4 sm:px-10 rounded-lg font-semibold w-fit cursor-default">
              Pending
            </div>
          </div>
        </div>
      );
    } else if (
      otherProposalData?.connection.status ===
      ProposerMatchingProposalStatusEnum.Accepted
    ) {
      return (
        <div>
          <div className="my-2 sm:pl-8">
            <div className="bg-green-600  text-white py-2 px-4 sm:px-10 rounded-lg font-semibold w-fit cursor-default">
              Matched Proposal
            </div>
          </div>
        </div>
      );
    } else if (
      otherProposalData?.connection.status ===
      ProposerMatchingProposalStatusEnum.Rejected
    ) {
      return (
        <div>
          <span className="font-semibold">
            Proposal rejected. You can propose again.
          </span>
          <div className="my-4 sm:pl-8">
            <div className="bg-gray-600  text-white py-2 px-4 sm:px-10 rounded-lg font-semibold w-fit cursor-default">
              Rejected
            </div>
            <div className="bg-black hover:bg-gray-800 text-white py-2 px-4 sm:px-10 rounded-lg font-semibold w-fit cursor-pointer">
              Propose Again
            </div>
          </div>
        </div>
      );
    }
  };

  const getContent = () => {
    if (otherProposalQuery.isPending) {
      return <Skeleton active />;
    } else if (otherProposalQuery.isSuccess) {
      return (
        <div>
          <div className="flex flex-row justify-center">
            <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] flex justify-center items-center">
              <Image
                className="max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]"
                src={otherProposalData?.profilePhoto}
                alt="Profile photo"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <span className="capitalize text-2xl font-bold">
              {prop.otherProposer?.firstName +
                " " +
                prop.otherProposer?.lastName}
            </span>

            {otherProposalData?.bioTitle ? (
              <div className="my-2 pl-2 font-medium">
                {otherProposalData?.bioTitle}
              </div>
            ) : (
              <></>
            )}

            {otherProposalData?.bioDescription ? (
              <div className="my-2 pl-2 text-justify">
                {otherProposalData?.bioDescription}
              </div>
            ) : (
              <></>
            )}

            {otherProposalData?.connection?.status !==
            ProposerMatchingProposalStatusEnum.Accepted ? (
              <div className="my-2">
                <Alert
                  message="Only matched proposal can view the contact details and birthday."
                  type="info"
                  showIcon
                />
              </div>
            ) : (
              <></>
            )}

            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">Respond</span>
              <div className="my-4 p-4 bg-white rounded-lg">
                {getRespondContent()}
              </div>
            </div>

            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">
                Personal Information
              </span>
              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Basic</span>
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Ethnicity
                      </div>
                      <div className="w-full">
                        {otherProposalData?.ethnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">
                        {otherProposalData?.religion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Age </div>
                      <div className="w-full">
                        {otherProposalData?.age} years old
                      </div>
                    </div>
                    {otherProposalData?.connection?.status ===
                    ProposerMatchingProposalStatusEnum.Accepted ? (
                      <div className="flex flex-row gap-4 py-2">
                        <div className="font-medium w-full text-right">
                          Birthday
                        </div>
                        <div className="w-full">
                          {dayjs(otherProposalData.birthDay).format(
                            "DD/MM/YYYY",
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">
                        {otherProposalData?.caste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Civil Status
                      </div>
                      <div className="w-full">
                        {otherProposalData?.civilStatus}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Height
                      </div>
                      <div className="w-full">{otherProposalData?.height}</div>
                    </div>
                  </div>
                </div>
              </div>
              {otherProposalData?.connection?.status ===
              ProposerMatchingProposalStatusEnum.Accepted ? (
                <div className="my-4 p-4 bg-white rounded-lg">
                  <span className="font-semibold">Contact Details</span>
                  <div className="md:w-1/2 w-full mt-2">
                    <div className="flex flex-row gap-4 py-2 md:mr-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        WhatsApp Number
                      </div>
                      <div className="w-full">
                        {otherProposalData?.whatsAppNumber}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Residency</span>
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country
                      </div>
                      <div className="w-full">
                        {otherProposalData?.country
                          ? getCountryLabel(otherProposalData.country)
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        State / District
                      </div>
                      <div className="w-full">
                        {otherProposalData?.stateOrDistrict}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">City</div>
                      <div className="w-full">{otherProposalData?.city}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Education and Profession</span>
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Education
                      </div>
                      <div className="w-full">
                        {otherProposalData?.education}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 md:bg-slate-100 md:rounded-lg">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">
                        {otherProposalData?.profession}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Habits</span>
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Drinking
                      </div>
                      <div className="w-full">
                        {otherProposalData?.drinking ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Smoking
                      </div>
                      <div className="w-full">
                        {otherProposalData?.smoking ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Food Preference
                      </div>
                      <div className="w-full">
                        {otherProposalData?.foodPreference ===
                        ProposerFoodPreferenceEnum.NonVegetarian
                          ? "Non vegetarian"
                          : otherProposalData?.foodPreference}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">Family Information</span>
              <div className="my-4 p-4 bg-white rounded-lg">
                <div className=" flex md:flex-row flex-col gap-4">
                  <div className="w-full">
                    <span className="font-semibold">Father</span>
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg mt-2">
                      <div className="font-medium w-full text-right">
                        Ethnicity
                      </div>
                      <div className="w-full">
                        {otherProposalData?.fatherEthnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">
                        {otherProposalData?.fatherReligion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">
                        {otherProposalData?.fatherCaste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">
                        {otherProposalData?.fatherProfession ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country of Residence
                      </div>
                      <div className="w-full">
                        {otherProposalData?.fatherCountryOfResidence
                          ? getCountryLabel(
                              otherProposalData.fatherCountryOfResidence,
                            )
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Additional Information
                      </div>
                      <div className="w-full">
                        {otherProposalData?.fatherAdditionalInfo ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <span className="font-semibold">Mother</span>
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg mt-2">
                      <div className="font-medium w-full text-right">
                        Ethnicity
                      </div>
                      <div className="w-full">
                        {otherProposalData?.motherEthnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">
                        {otherProposalData?.motherReligion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">
                        {otherProposalData?.motherCaste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">
                        {otherProposalData?.motherProfession ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country of Residence
                      </div>
                      <div className="w-full">
                        {otherProposalData?.motherCountryOfResidence
                          ? getCountryLabel(
                              otherProposalData.motherCountryOfResidence,
                            )
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Additional Information
                      </div>
                      <div className="w-full">
                        {otherProposalData?.motherAdditionalInfo ?? "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">
                Horoscope Requirements
              </span>

              <div className="my-4 p-4 bg-white rounded-lg">
                <div className="md:w-1/2 w-full">
                  <div className="flex flex-row gap-4 py-2 md:mr-2 bg-slate-100 rounded-lg">
                    <div className="font-medium w-full text-right">
                      Horoscope Matching
                    </div>
                    <div className="w-full">
                      {otherProposalData?.horoscopeMatching
                        ? "Required"
                        : "Not required"}
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
      <div className="my-8 sm:p-4 max-h-[65vh] overflow-y-auto">
        {getContent()}
      </div>
    </Modal>
  );
}

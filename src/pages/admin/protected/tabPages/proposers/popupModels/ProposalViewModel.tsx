import { Modal, Image, Skeleton } from "antd";
import {
  AdminProposerType,
  ProposerFoodPreferenceEnum,
  adminProposalType,
} from "../../../../../../utility/typesAndEnum";
import { useEffect, useState } from "react";
import { getCountryLabel } from "../../../../../../utility/Methods";
import dayjs from "dayjs";
import { useAdminGetProposal } from "../../../../../../services/admin";

type ProposalViewModelProp = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  proposer?: AdminProposerType;
};

export default function ProposalViewModel(prop: ProposalViewModelProp) {
  const adminGetProposalQuery = useAdminGetProposal(prop.proposer?.id);
  const [proposalData, setOtherProposalData] = useState<adminProposalType>();

  useEffect(() => {
    loadProposalData();
  }, [adminGetProposalQuery]);

  const loadProposalData = () => {
    if (adminGetProposalQuery.isSuccess) {
      if (adminGetProposalQuery.data.data.success) {
        setOtherProposalData(adminGetProposalQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (adminGetProposalQuery.isPending) {
      return <Skeleton active />;
    } else if (adminGetProposalQuery.isSuccess) {
      return (
        <div>
          <div className="flex flex-row justify-center">
            <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[200px] sm:h-[250px] lg:h-[300px] flex justify-center items-center">
              <Image
                className="max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]"
                src={proposalData?.profilePhoto}
                alt="Profile photo"
              />
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <span className="capitalize text-2xl font-bold">
              {prop.proposer?.firstName + " " + prop.proposer?.lastName}
            </span>

            {proposalData?.bioTitle ? (
              <div className="my-2 pl-2 font-medium">
                {proposalData?.bioTitle}
              </div>
            ) : (
              <></>
            )}

            {proposalData?.bioDescription ? (
              <div className="my-2 pl-2 text-justify">
                {proposalData?.bioDescription}
              </div>
            ) : (
              <></>
            )}

            <div className="bg-cyan-100 rounded-lg p-4 mt-4">
              <span className="text-lg font-semibold">Proposal Data</span>
              <div className="my-4 p-4 bg-white rounded-lg">
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Proposer ID
                      </div>
                      <div className="w-full">{prop.proposer?.id}</div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Created At
                      </div>
                      <div className="w-full">
                        {dayjs(proposalData?.createdAt).format(
                          "YYYY/MM/DD HH:mm:ss",
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Updated At
                      </div>
                      <div className="w-full">
                        {dayjs(proposalData?.updatedAt).format(
                          "YYYY/MM/DD HH:mm:ss",
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
                      <div className="w-full">{proposalData?.ethnicity}</div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">{proposalData?.religion}</div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Age </div>
                      <div className="w-full">
                        {dayjs().diff(prop.proposer?.birthDay, "year")} years
                        old
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Birthday
                      </div>
                      <div className="w-full">
                        {dayjs(prop.proposer?.birthDay).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">{proposalData?.caste ?? "-"}</div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Civil Status
                      </div>
                      <div className="w-full">{proposalData?.civilStatus}</div>
                    </div>
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Height
                      </div>
                      <div className="w-full">{proposalData?.height}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Contact Details</span>
                <div className="md:w-1/2 w-full mt-2">
                  <div className="flex flex-row gap-4 py-2 md:mr-2 bg-slate-100 rounded-lg">
                    <div className="font-medium w-full text-right">
                      WhatsApp Number
                    </div>
                    <div className="w-full">{proposalData?.whatsAppNumber}</div>
                  </div>
                </div>
              </div>

              <div className="my-4 p-4 bg-white rounded-lg">
                <span className="font-semibold">Residency</span>
                <div className="flex md:flex-row flex-col md:gap-4 mt-2">
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country
                      </div>
                      <div className="w-full">
                        {proposalData?.country
                          ? getCountryLabel(proposalData.country)
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        State / District
                      </div>
                      <div className="w-full">
                        {proposalData?.stateOrDistrict}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">City</div>
                      <div className="w-full">{proposalData?.city}</div>
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
                      <div className="w-full">{proposalData?.education}</div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 md:bg-slate-100 md:rounded-lg">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">{proposalData?.profession}</div>
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
                        {proposalData?.drinking ? "Yes" : "No"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Smoking
                      </div>
                      <div className="w-full">
                        {proposalData?.smoking ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Food Preference
                      </div>
                      <div className="w-full">
                        {proposalData?.foodPreference ===
                        ProposerFoodPreferenceEnum.NonVegetarian
                          ? "Non vegetarian"
                          : proposalData?.foodPreference}
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
                        {proposalData?.fatherEthnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">
                        {proposalData?.fatherReligion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">
                        {proposalData?.fatherCaste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">
                        {proposalData?.fatherProfession ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country of Residence
                      </div>
                      <div className="w-full">
                        {proposalData?.fatherCountryOfResidence
                          ? getCountryLabel(
                              proposalData.fatherCountryOfResidence,
                            )
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Additional Information
                      </div>
                      <div className="w-full">
                        {proposalData?.fatherAdditionalInfo ?? "-"}
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
                        {proposalData?.motherEthnicity}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Religion
                      </div>
                      <div className="w-full">
                        {proposalData?.motherReligion}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">Caste</div>
                      <div className="w-full">
                        {proposalData?.motherCaste ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Profession
                      </div>
                      <div className="w-full">
                        {proposalData?.motherProfession ?? "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4  py-2 bg-slate-100 rounded-lg">
                      <div className="font-medium w-full text-right">
                        Country of Residence
                      </div>
                      <div className="w-full">
                        {proposalData?.motherCountryOfResidence
                          ? getCountryLabel(
                              proposalData.motherCountryOfResidence,
                            )
                          : "-"}
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 py-2">
                      <div className="font-medium w-full text-right">
                        Additional Information
                      </div>
                      <div className="w-full">
                        {proposalData?.motherAdditionalInfo ?? "-"}
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
                      {proposalData?.horoscopeMatching
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

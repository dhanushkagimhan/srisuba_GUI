import { Empty, Pagination, Skeleton, Image } from "antd";
import { useEffect, useState } from "react";
import { useProposerGetOtherProposers } from "../../../../../services/proposer/proposal/proposal";
import { ProposerOtherProposerType } from "../../../../../utility/typesAndEnum";
import { FaLocationDot, FaUser, FaBookOpenReader } from "react-icons/fa6";
import { getCountryLabel } from "../../../../../utility/Methods";
import { FaBirthdayCake } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import OtherProposalViewModel from "./otherProposalViewModel/OtherProposalViewModel";

export default function ProposerProposals() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [otherProposers, setOtherProposers] = useState<
    ProposerOtherProposerType[]
  >([]);
  const otherProposersQuery = useProposerGetOtherProposers(currentPage);
  const [isOtherProposalViewModelOpen, setIsOtherProposalViewModelOpen] =
    useState<boolean>(false);
  const [otherProposerData, setOtherProposerData] =
    useState<ProposerOtherProposerType>();

  useEffect(() => {
    loadOtherProposersData();
  }, [currentPage, otherProposersQuery]);

  const loadOtherProposersData = () => {
    if (otherProposersQuery.isSuccess) {
      if (otherProposersQuery.data.data.success) {
        setOtherProposers(otherProposersQuery.data.data.data);
      }
      setTotalDataCount(otherProposersQuery.data.data.pagination.totalCount);
    }
  };

  const getContent = () => {
    if (totalDataCount === 0) {
      return <Empty />;
    } else if (otherProposersQuery.isPending) {
      return <Skeleton active />;
    } else if (otherProposersQuery.isSuccess) {
      return (
        <div>
          {Array.isArray(otherProposers)
            ? otherProposers.map((otherProposer: ProposerOtherProposerType) => {
                return (
                  <div
                    key={otherProposer.id}
                    className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
                  >
                    <div className="flex sm:flex-row flex-col sm:justify-between gap-4">
                      <div className="w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] flex justify-center items-center">
                        <Image
                          className="max-w-[250px] lg:max-w-[300px] h-[250px] lg:max-h-[300px]"
                          src={`${import.meta.env.VITE_S3_IMAGES_BASE_URL}${
                            otherProposer.profilePhoto
                          }`}
                          alt="Profile photo"
                        />
                      </div>
                      <div className="sm:w-full bg-slate-50 rounded-lg p-4 flex flex-col">
                        <div className="mb-2">
                          <span className="capitalize text-2xl font-semibold">
                            {otherProposer.firstName +
                              " " +
                              otherProposer.lastName}
                          </span>
                        </div>
                        <div className="p-4 flex items-center h-full">
                          <div className="w-full lg:pl-8">
                            <div className="flex md:flex-row flex-col max-md:gap-6">
                              <div className="w-full flex flex-col gap-6">
                                <div>
                                  <FaLocationDot />
                                  <span className="font-medium ml-2">
                                    {otherProposer.city},{" "}
                                    {getCountryLabel(otherProposer.country)}
                                  </span>
                                </div>
                                <div>
                                  <FaUser />
                                  <span className="font-medium ml-2">
                                    {otherProposer.ethnicity}
                                  </span>
                                </div>
                                <div>
                                  <FaBookOpenReader />
                                  <span className="font-medium ml-2">
                                    {otherProposer.religion}
                                  </span>
                                </div>
                              </div>
                              <div className="w-full flex flex-col gap-6">
                                <div>
                                  <FaBirthdayCake />
                                  <span className="font-medium ml-2">
                                    {otherProposer.age} years old
                                  </span>
                                </div>
                                <div>
                                  <HiBuildingOffice2 />
                                  <span className="font-medium ml-2">
                                    {otherProposer.profession}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-end p-2">
                          <div
                            className="sm:text-xl text-lg cursor-pointer font-semibold p-2 bg-white rounded-lg hover:text-white hover:bg-black"
                            onClick={() => viewOtherProposal(otherProposer)}
                          >
                            View Full Proposal {">>"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      );
    }
  };

  const viewOtherProposal = (otherProposer: ProposerOtherProposerType) => {
    setOtherProposerData(otherProposer);
    setIsOtherProposalViewModelOpen(true);
  };

  return (
    <div>
      <div className="xl:pl-20">
        <p className="font-medium text-xl">Posted all proposals</p>
      </div>
      <div className="flex flex-row justify-center my-8">
        <div className="2xl:w-3/5 xl:w-4/5 w-full">{getContent()}</div>
      </div>
      <div className="flex flex-row justify-center">
        <div>
          <Pagination
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            pageSize={10}
            total={totalDataCount}
            showSizeChanger={false}
          />
        </div>
      </div>
      <OtherProposalViewModel
        isModalOpen={isOtherProposalViewModelOpen}
        setIdModelOpen={setIsOtherProposalViewModelOpen}
        otherProposer={otherProposerData}
      />
    </div>
  );
}

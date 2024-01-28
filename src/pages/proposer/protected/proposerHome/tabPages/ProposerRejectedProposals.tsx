import { useEffect, useState } from "react";
import {
  ProposerOtherProposerType,
  ProposerRejectedProposerType,
} from "../../../../../utility/typesAndEnum";
import { useProposerGetRejectedProposers } from "../../../../../services/proposer";
import { Empty, Skeleton } from "antd";
import OtherProposalViewModel from "./otherProposalViewModel/OtherProposalViewModel";

export default function ProposerRejectedProposals() {
  const [rejectedProposals, setRejectedProposals] = useState<
    ProposerRejectedProposerType[]
  >([]);
  const rejectedProposersQuery = useProposerGetRejectedProposers();
  const [isOtherProposalViewModelOpen, setIsOtherProposalViewModelOpen] =
    useState<boolean>(false);
  const [otherProposerData, setOtherProposerData] =
    useState<Partial<ProposerOtherProposerType>>();

  useEffect(() => {
    loadRejectedProposersData();
  }, [rejectedProposersQuery]);

  const loadRejectedProposersData = () => {
    if (rejectedProposersQuery.isSuccess) {
      if (rejectedProposersQuery.data.data.success) {
        setRejectedProposals(rejectedProposersQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (rejectedProposals.length === 0) {
      return <Empty />;
    } else if (rejectedProposersQuery.isPending) {
      return <Skeleton active />;
    } else if (rejectedProposersQuery.isSuccess) {
      return (
        <div>
          {Array.isArray(rejectedProposals)
            ? rejectedProposals.map(
                (rejectedProposer: ProposerRejectedProposerType, index) => {
                  return (
                    <div
                      key={rejectedProposer.id}
                      className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
                    >
                      <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
                        <div className="flex flex-row w-full gap-4">
                          <div>
                            {index + 1}
                            {" )"}
                          </div>
                          <div className="capitalize font-semibold">
                            {rejectedProposer.firstName}{" "}
                            {rejectedProposer.lastName}
                          </div>
                        </div>
                        <div className="w-full flex min-[370px]:flex-row flex-col min-[370px]:justify-between justify-center items-center">
                          <div className="text-left">
                            {rejectedProposer.isIPropose ? (
                              <span className="text-teal-800 max-sm:pl-8 max-[370px]:pl-0">
                                'Proposed by me'
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div
                            className="py-2 px-4 max-[370px]:mt-2 hover:bg-black hover:text-white cursor-pointer font-medium rounded-lg"
                            onClick={() => viewOtherProposal(rejectedProposer)}
                          >
                            View proposal {">>"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              )
            : null}
        </div>
      );
    }
  };

  const viewOtherProposal = (
    rejectedProposer: ProposerRejectedProposerType,
  ) => {
    const otherProposer: Partial<ProposerOtherProposerType> = {
      id: rejectedProposer.receiverId,
      firstName: rejectedProposer.firstName,
      lastName: rejectedProposer.lastName,
    };
    setOtherProposerData(otherProposer);
    setIsOtherProposalViewModelOpen(true);
  };

  return (
    <div>
      <div className="xl:pl-20">
        <p className="font-medium">
          Proposals that rejected. You can propose again to this persons.
        </p>
      </div>
      <div className="flex flex-row justify-center my-8">
        <div className="2xl:w-3/5 xl:w-4/5 w-full">{getContent()}</div>
      </div>
      <OtherProposalViewModel
        isModalOpen={isOtherProposalViewModelOpen}
        setIdModelOpen={setIsOtherProposalViewModelOpen}
        otherProposer={otherProposerData}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  ProposerReceivedProposerType,
  ProposerOtherProposerType,
} from "../../../../../utility/typesAndEnum";
import { useProposerGetReceivedProposers } from "../../../../../services/proposer";
import { Empty, Skeleton } from "antd";
import OtherProposalViewModel from "./otherProposalViewModel/OtherProposalViewModel";

export default function ReceivedProposals() {
  const [receivedProposers, setReceivedProposers] = useState<
    ProposerReceivedProposerType[]
  >([]);
  const receivedProposersQuery = useProposerGetReceivedProposers();
  const [isOtherProposalViewModelOpen, setIsOtherProposalViewModelOpen] =
    useState<boolean>(false);
  const [otherProposerData, setOtherProposerData] =
    useState<Partial<ProposerOtherProposerType>>();

  useEffect(() => {
    loadReceivedProposersData();
  }, [receivedProposersQuery]);

  const loadReceivedProposersData = () => {
    if (receivedProposersQuery.isSuccess) {
      if (receivedProposersQuery.data.data.success) {
        setReceivedProposers(receivedProposersQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (receivedProposers.length === 0) {
      return <Empty />;
    } else if (receivedProposersQuery.isPending) {
      return <Skeleton active />;
    } else if (receivedProposersQuery.isSuccess) {
      return (
        <div>
          {Array.isArray(receivedProposers)
            ? receivedProposers.map(
                (receivedProposer: ProposerReceivedProposerType, index) => {
                  return (
                    <div
                      key={receivedProposer.id}
                      className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
                    >
                      <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
                        <div className="flex flex-row w-full gap-4">
                          <div>
                            {index + 1}
                            {" )"}
                          </div>
                          <div className="capitalize font-semibold">
                            {receivedProposer.firstName}{" "}
                            {receivedProposer.lastName}
                          </div>
                        </div>
                        <div className="w-full flex flex-row justify-end">
                          <div
                            className="py-2 px-4 hover:bg-black hover:text-white cursor-pointer font-medium rounded-lg"
                            onClick={() => viewOtherProposal(receivedProposer)}
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
    receivedProposer: ProposerReceivedProposerType,
  ) => {
    const otherProposer: Partial<ProposerOtherProposerType> = {
      id: receivedProposer.proposerId,
      firstName: receivedProposer.firstName,
      lastName: receivedProposer.lastName,
    };
    setOtherProposerData(otherProposer);
    setIsOtherProposalViewModelOpen(true);
  };

  return (
    <div>
      <div className="xl:pl-20">
        <p className="font-medium text-xl">
          All received proposals list. You can view proposal and then accept or
          reject that proposal.
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

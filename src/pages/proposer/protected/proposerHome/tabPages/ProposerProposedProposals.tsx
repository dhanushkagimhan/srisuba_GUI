import { useEffect, useState } from "react";
import {
  ProposerOtherProposerType,
  ProposerProposedProposerType,
} from "../../../../../utility/typesAndEnum";
import { useProposerGetProposedProposers } from "../../../../../services/proposer";
import { Empty, Skeleton } from "antd";
import OtherProposalViewModel from "./otherProposalViewModel/OtherProposalViewModel";

export default function ProposerProposedProposals() {
  const [proposedProposals, setProposedProposals] = useState<
    ProposerProposedProposerType[]
  >([]);
  const proposedProposersQuery = useProposerGetProposedProposers();
  const [isOtherProposalViewModelOpen, setIsOtherProposalViewModelOpen] =
    useState<boolean>(false);
  const [otherProposerData, setOtherProposerData] =
    useState<Partial<ProposerOtherProposerType>>();

  useEffect(() => {
    loadProposedProposersData();
  }, [proposedProposersQuery]);

  const loadProposedProposersData = () => {
    if (proposedProposersQuery.isSuccess) {
      if (proposedProposersQuery.data.data.success) {
        setProposedProposals(proposedProposersQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (proposedProposals.length === 0) {
      return <Empty />;
    } else if (proposedProposersQuery.isPending) {
      return <Skeleton active />;
    } else if (proposedProposersQuery.isSuccess) {
      return (
        <div>
          {Array.isArray(proposedProposals)
            ? proposedProposals.map(
                (proposedProposer: ProposerProposedProposerType, index) => {
                  return (
                    <div
                      key={proposedProposer.id}
                      className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
                    >
                      <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
                        <div className="flex flex-row w-full gap-4">
                          <div>
                            {index + 1}
                            {" )"}
                          </div>
                          <div className="capitalize font-semibold">
                            {proposedProposer.firstName}{" "}
                            {proposedProposer.lastName}
                          </div>
                        </div>
                        <div className="w-full flex flex-row justify-end">
                          <div
                            className="py-2 px-4 hover:bg-black hover:text-white cursor-pointer font-medium rounded-lg"
                            onClick={() => viewOtherProposal(proposedProposer)}
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
    proposedProposer: ProposerProposedProposerType,
  ) => {
    const otherProposer: Partial<ProposerOtherProposerType> = {
      id: proposedProposer.receiverId,
      firstName: proposedProposer.firstName,
      lastName: proposedProposer.lastName,
    };
    setOtherProposerData(otherProposer);
    setIsOtherProposalViewModelOpen(true);
  };

  return (
    <div>
      <div className="xl:pl-20">
        <p className="font-medium text-xl">
          All proposals that proposed by you. wait for the review these
          proposal.
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

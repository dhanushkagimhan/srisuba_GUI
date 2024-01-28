import { useEffect, useState } from "react";
import {
  ProposerMatchedProposerType,
  ProposerOtherProposerType,
} from "../../../../../utility/typesAndEnum";
import { useProposerGetMatchedProposers } from "../../../../../services/proposer";
import { Empty, Skeleton } from "antd";
import OtherProposalViewModel from "./otherProposalViewModel/OtherProposalViewModel";

export default function MatchedProposals() {
  const [matchedProposers, setMatchedProposers] = useState<
    ProposerMatchedProposerType[]
  >([]);
  const matchedProposersQuery = useProposerGetMatchedProposers();
  const [isOtherProposalViewModelOpen, setIsOtherProposalViewModelOpen] =
    useState<boolean>(false);
  const [otherProposerData, setOtherProposerData] =
    useState<Partial<ProposerOtherProposerType>>();

  useEffect(() => {
    loadMatchedProposersData();
  }, [matchedProposersQuery]);

  const loadMatchedProposersData = () => {
    if (matchedProposersQuery.isSuccess) {
      if (matchedProposersQuery.data.data.success) {
        setMatchedProposers(matchedProposersQuery.data.data.data);
      }
    }
  };

  const getContent = () => {
    if (matchedProposers.length === 0) {
      return <Empty />;
    } else if (matchedProposersQuery.isPending) {
      return <Skeleton active />;
    } else if (matchedProposersQuery.isSuccess) {
      return (
        <div>
          {Array.isArray(matchedProposers)
            ? matchedProposers.map(
                (matchedProposer: ProposerMatchedProposerType, index) => {
                  return (
                    <div
                      key={matchedProposer.id}
                      className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
                    >
                      <div className="flex sm:flex-row flex-col sm:justify-between items-center gap-4">
                        <div className="flex flex-row w-full gap-4">
                          <div>
                            {index + 1}
                            {" )"}
                          </div>
                          <div className="capitalize font-semibold">
                            {matchedProposer.firstName}{" "}
                            {matchedProposer.lastName}
                          </div>
                        </div>
                        <div className="w-full flex flex-row justify-end">
                          <div
                            className="py-2 px-4 hover:bg-black hover:text-white cursor-pointer font-medium rounded-lg"
                            onClick={() => viewOtherProposal(matchedProposer)}
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

  const viewOtherProposal = (matchedProposer: ProposerMatchedProposerType) => {
    const otherProposer: Partial<ProposerOtherProposerType> = {
      id: matchedProposer.proposerId,
      firstName: matchedProposer.firstName,
      lastName: matchedProposer.lastName,
    };
    setOtherProposerData(otherProposer);
    setIsOtherProposalViewModelOpen(true);
  };

  return (
    <div>
      <div className="xl:pl-20">
        <p className="font-medium">
          All matched connections. you can view contact information of this
          persons.
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

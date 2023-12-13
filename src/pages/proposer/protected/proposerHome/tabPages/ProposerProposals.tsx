import { Empty, Pagination, Skeleton, Image } from "antd";
import { useEffect, useState } from "react";
import { useProposerGetOtherProposers } from "../../../../../services/proposer/proposal/proposal";
import { ProposerOtherProposer } from "../../../../../utility/typesAndEnum";

export default function ProposerProposals() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [otherProposers, setOtherProposers] = useState<ProposerOtherProposer[]>(
    [],
  );
  const otherProposersQuery = useProposerGetOtherProposers(currentPage);

  useEffect(() => {
    loadOhterProposersData();
  }, [currentPage, otherProposersQuery.isSuccess]);

  const loadOhterProposersData = () => {
    console.log("dd");
    if (otherProposersQuery.isSuccess) {
      console.log("ss");
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
      console.log("hi");
      return <Skeleton active />;
    } else if (otherProposersQuery.isSuccess) {
      return (
        <div>
          {otherProposers.map((otherProposer: ProposerOtherProposer) => {
            return (
              <div
                key={otherProposer.id}
                className=" border-2 border-slate-200 border-solid rounded-lg my-12 p-4"
              >
                <div className="flex flex-row gap-4">
                  <div>
                    <Image
                      className="max-w-[200px] max-h-[400px]"
                      src={otherProposer.profilePhoto}
                      alt="Profile photo"
                    />
                  </div>
                  <div className="w-full">
                    <div className="mb-2">
                      <span className="capitalize text-lg font-medium">
                        {otherProposer.firstName + " " + otherProposer.lastName}
                      </span>
                    </div>
                    <div className="border-1 border-slate-200 border-solid rounded-lg w-full h-full bg-white p-4">
                      <div className="flex flex-row justify-between">
                        <div>
                          {/* <FontAwesomeIcon icon="fa-solid fa-location-dot" /> */}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="pl-8">
        <p className="font-medium">Posted All Proposals</p>
      </div>
      <div className="flex flex-row justify-center my-8">
        <div className="md:w-3/5 w-full">{getContent()}</div>
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
    </div>
  );
}

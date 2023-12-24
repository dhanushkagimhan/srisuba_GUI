import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useAdminGetMarketerWithdrawals } from "../../../../../../services/admin";
import { AdminMarketerWithdrawalType } from "../../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type MarketerWithdrawModelProps = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  marketerId?: number;
};

export default function MarketerWithdrawModel(
  prop: MarketerWithdrawModelProps,
) {
  // const [marketerWithdrawals, setMarketerWithdrawals] = useState<
  //   AdminMarketerWithdrawalType[]
  // >([]);

  // const adminMarketerWithdrawalsQuery = useAdminGetMarketerWithdrawals(
  //   prop.isModalOpen,
  //   prop.marketerId,
  // );

  // useEffect(() => {
  //   loadMarketerWithdrawalsData();
  // }, [adminMarketerWithdrawalsQuery.data]);

  // const loadMarketerWithdrawalsData = () => {
  //   if (adminMarketerWithdrawalsQuery.isSuccess) {
  //     if (adminMarketerWithdrawalsQuery.data.data.success) {
  //       const marketerWithdrawalsData: AdminMarketerWithdrawalType[] =
  //         adminMarketerWithdrawalsQuery.data.data.data;

  //       const marketerWithdrawalsTableViewData: AdminMarketerWithdrawalType[] =
  //         marketerWithdrawalsData.map(
  //           (withdrawal: AdminMarketerWithdrawalType, index) => ({
  //             key: index,
  //             ...withdrawal,
  //           }),
  //         );
  //       setMarketerWithdrawals(marketerWithdrawalsTableViewData);
  //     }
  //   }
  // };

  const getContent = () => {
    return (
      <div>
        <div>
          <div className="mb-4 font-medium text-lg">Withdraw income</div>
          <span className="font-medium">MarketerId Id : </span>
          {prop.marketerId ?? ""}
        </div>
        <div className="mt-4">ssss</div>
      </div>
    );
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

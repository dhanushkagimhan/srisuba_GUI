import { Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useAdminGetMarketerReferredProposers } from "../../../../../../services/admin";
import {
  AdminMarketerReferredProposerType,
  PaymentStatusEnum,
} from "../../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type MarketerReferredProposerViewModelProps = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  marketerId?: number;
};

export default function MarketerReferredProposerViewModel(
  prop: MarketerReferredProposerViewModelProps,
) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [marketerReferredProposers, setMarketerReferredProposers] = useState<
    AdminMarketerReferredProposerType[]
  >([]);

  const adminMarketerReferredProposersQuery =
    useAdminGetMarketerReferredProposers(currentPage, 10, prop.marketerId);

  useEffect(() => {
    loadMarketerReferredProposersData();
  }, [currentPage, adminMarketerReferredProposersQuery.data]);

  const loadMarketerReferredProposersData = () => {
    if (adminMarketerReferredProposersQuery.isSuccess) {
      if (adminMarketerReferredProposersQuery.data.data.success) {
        const marketerReferredProposersData: AdminMarketerReferredProposerType[] =
          adminMarketerReferredProposersQuery.data.data.data;

        const marketerReferredProposersTableViewData: AdminMarketerReferredProposerType[] =
          marketerReferredProposersData.map(
            (proposer: AdminMarketerReferredProposerType, index) => ({
              key: index,
              ...proposer,
            }),
          );
        setMarketerReferredProposers(marketerReferredProposersTableViewData);
      }
      setTotalDataCount(
        adminMarketerReferredProposersQuery.data.data.pagination.totalCount,
      );
    }
  };

  const marketerReferredProposersTableColumns: ColumnsType<AdminMarketerReferredProposerType> =
    [
      {
        title: "ID",
        dataIndex: "id",
      },

      {
        title: "Payment Status",
        dataIndex: "paymentStatus",
        render: (value) => {
          if (value === PaymentStatusEnum.Pending) {
            return <Tag color="orange">{PaymentStatusEnum.Pending}</Tag>;
          } else {
            return <Tag color="green">{PaymentStatusEnum.Approved}</Tag>;
          }
        },
      },
      {
        title: "Payment Value",
        dataIndex: "paymentValue",
      },
      {
        title: "Proposer Id",
        dataIndex: "proposerId",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        render: (value) => (
          <span>{dayjs(value).format("YYYY/MM/DD HH:mm:ss")} </span>
        ),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        render: (value) => (
          <span>{dayjs(value).format("YYYY/MM/DD HH:mm:ss")} </span>
        ),
      },
    ];

  const getContent = () => {
    return (
      <div>
        <div>
          <div className="mb-4 font-medium text-lg">Referred proposers</div>
          <span className="font-medium">MarketerId Id : </span>
          {prop.marketerId ?? ""}
        </div>
        <div className="mt-4">
          <Table
            dataSource={marketerReferredProposers}
            columns={marketerReferredProposersTableColumns}
            scroll={{ x: true }}
            loading={adminMarketerReferredProposersQuery.isPending}
            pagination={{
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
              pageSize: 10,
              total: totalDataCount,
              showSizeChanger: false,
            }}
          />
        </div>
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

import { Table, Tag } from "antd";
import {
  MarketerAffiliatedProposerType,
  PaymentStatusEnum,
} from "../../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMarketerGetAffiliatedProposers } from "../../../../../../services/marketer";
import { getCountryLabel } from "../../../../../../utility/Methods";

export default function MarketerAffiliatedProposers() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [affiliatedProposers, setAffiliatedProposers] = useState<
    MarketerAffiliatedProposerType[]
  >([]);
  const marketerAffiliatedProposersQuery =
    useMarketerGetAffiliatedProposers(currentPage);

  useEffect(() => {
    loadAffiliatedProposerData();
  }, [currentPage, marketerAffiliatedProposersQuery]);

  const loadAffiliatedProposerData = () => {
    if (marketerAffiliatedProposersQuery.isSuccess) {
      if (marketerAffiliatedProposersQuery.data.data.success) {
        setAffiliatedProposers(marketerAffiliatedProposersQuery.data.data.data);
      }
      setTotalDataCount(
        marketerAffiliatedProposersQuery.data.data.pagination.totalCount,
      );
    }
  };

  const affiliatedProposersTableColumns: ColumnsType<MarketerAffiliatedProposerType> =
    [
      {
        title: "Name",
        dataIndex: "firstName",
        render: (value, record) => (
          <span className="capitalize">{value + " " + record.lastName} </span>
        ),
      },

      {
        title: "Country",
        dataIndex: "country",
        render: (value) => <span>{getCountryLabel(value)}</span>,
      },
      {
        title: "Referred Date",
        dataIndex: "createdAt",
        render: (createdAt) => (
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        ),
      },
      {
        title: "Payment",
        dataIndex: "paymentValue",
        render: (value) => <span>Rs. {value} (LKR)</span>,
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
    ];

  return (
    <div>
      <Table
        dataSource={affiliatedProposers}
        columns={affiliatedProposersTableColumns}
        scroll={{ x: true }}
        loading={marketerAffiliatedProposersQuery.isPending}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          pageSize: 10,
          total: totalDataCount,
          showSizeChanger: false,
        }}
      />
    </div>
  );
}

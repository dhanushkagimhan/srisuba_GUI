import { Table, Tag } from "antd";
import {
  MarketerAffiliatedProposerType,
  PaymentStatus,
} from "../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useMarketerGetAffiliatedProposers } from "../../../../../services/marketer";
import { getCountryLabel } from "../../../../../utility/Methods";

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
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        render: (value) => <span className="capitalize">{value}</span>,
      },
      {
        title: "Last Name (1st char)",
        dataIndex: "lastName",
        key: "lastName",
        render: (value) => <span className="capitalize">{value}</span>,
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        render: (value) => <span>{getCountryLabel(value)}</span>,
      },
      {
        title: "Referred Date",
        dataIndex: "createdAt",
        key: "referredDate",
        render: (createdAt) => (
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        ),
      },
      {
        title: "Payment",
        dataIndex: "paymentValue",
        key: "paymentValue",
        render: (value) => <span>Rs. {value} (LKR)</span>,
      },
      {
        title: "Payment Status",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        render: (value) => {
          if (value === PaymentStatus.Pending) {
            return <Tag color="orange">{PaymentStatus.Pending}</Tag>;
          } else {
            return <Tag color="green">{PaymentStatus.Approved}</Tag>;
          }
        },
      },
    ];

  return (
    <div>
      <Table
        dataSource={affiliatedProposers}
        columns={affiliatedProposersTableColumns}
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

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { MarketerWithdrawalType } from "../../../../../utility/typesAndEnum";
import dayjs from "dayjs";
import { useMarketerGetWithdrawals } from "../../../../../services/marketer";
import { useEffect, useState } from "react";

export default function MarketerWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<MarketerWithdrawalType[]>([]);
  const marketerWithdrawalsQuery = useMarketerGetWithdrawals();

  useEffect(() => {
    loadWithdrawalsData();
  }, [marketerWithdrawalsQuery.data]);

  const loadWithdrawalsData = () => {
    if (marketerWithdrawalsQuery.isSuccess) {
      if (marketerWithdrawalsQuery.data.data.success) {
        if (Array.isArray(marketerWithdrawalsQuery.data.data.data)) {
          setWithdrawals(marketerWithdrawalsQuery.data.data.data);
        }
      }
    }
  };

  const withdrawalsTableColumns: ColumnsType<MarketerWithdrawalType> = [
    {
      render: (_, __, index) => <span>{index + 1} </span>,
    },
    {
      title: "Amount",
      dataIndex: "value",
      render: (value) => <span>Rs. {value} (LKR)</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => (
        <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
  ];

  return (
    <div>
      <div className="font-semibold mb-4 text-lg">Withdrawals</div>
      <div>
        <Table
          dataSource={withdrawals}
          columns={withdrawalsTableColumns}
          scroll={{ x: true }}
          loading={marketerWithdrawalsQuery.isPending}
          pagination={false}
        />
      </div>
    </div>
  );
}

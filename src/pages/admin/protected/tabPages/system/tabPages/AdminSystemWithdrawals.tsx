import { Table } from "antd";
import { useAdminGetSystemWithdrawals } from "../../../../../../services/admin";
import { useEffect, useState } from "react";
import { AdminSystemWithdrawalType } from "../../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

export default function AdminSystemWithdrawals() {
  const adminSystemWithdrawalsQuery = useAdminGetSystemWithdrawals();
  const [systemWithdrawals, setSystemWithdrawals] = useState<
    AdminSystemWithdrawalType[]
  >([]);

  useEffect(() => {
    loadSystemWithdrawalsData();
  }, [adminSystemWithdrawalsQuery.data]);

  const loadSystemWithdrawalsData = () => {
    if (adminSystemWithdrawalsQuery.isSuccess) {
      if (adminSystemWithdrawalsQuery.data.data.success) {
        const systemWithdrawalsData: AdminSystemWithdrawalType[] =
          adminSystemWithdrawalsQuery.data.data.data;

        if (Array.isArray(systemWithdrawalsData)) {
          const systemWithdrawalsTableViewData: AdminSystemWithdrawalType[] =
            systemWithdrawalsData.map(
              (withdrawal: AdminSystemWithdrawalType, index) => ({
                key: index,
                ...withdrawal,
              }),
            );
          setSystemWithdrawals(systemWithdrawalsTableViewData);
        }
      }
    }
  };

  const systemWithdrawalsTableColumns: ColumnsType<AdminSystemWithdrawalType> =
    [
      {
        title: "ID",
        dataIndex: "id",
      },

      {
        title: "Value",
        dataIndex: "value",
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

  return (
    <div>
      <div className="text-lg font-medium">System Withdrawals</div>

      <div className="mt-4">
        <Table
          dataSource={systemWithdrawals}
          columns={systemWithdrawalsTableColumns}
          scroll={{ x: true }}
          loading={adminSystemWithdrawalsQuery.isPending}
          pagination={false}
        />
      </div>
    </div>
  );
}

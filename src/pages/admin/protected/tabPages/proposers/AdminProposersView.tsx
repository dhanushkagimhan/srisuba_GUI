import { Checkbox, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  AdminProposerType,
  ProposerStatusEnum,
} from "../../../../../utility/typesAndEnum";
import dayjs from "dayjs";
import { useAdminGetProposals } from "../../../../../services/admin";
import { CheckboxChangeEvent } from "antd/es/checkbox";

export default function AdminProposersView() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [proposers, setProposers] = useState<AdminProposerType[]>([]);
  const [proposerStatus, setProposerStatus] = useState<ProposerStatusEnum>(
    ProposerStatusEnum.PendingPayment,
  );
  const [isOnlyExpired, setIsOnlyExpired] = useState<boolean>(false);
  const [isIncludePayments, setIsIncludePayments] = useState<boolean>(false);
  const [orderDesc, setOrderDesc] = useState<boolean>(false);

  const adminProposersQuery = useAdminGetProposals(
    currentPage,
    10,
    proposerStatus,
    isOnlyExpired,
    isIncludePayments,
    orderDesc,
  );

  useEffect(() => {
    loadProposerData();
  }, [currentPage, adminProposersQuery.data]);

  const loadProposerData = () => {
    if (adminProposersQuery.isSuccess) {
      if (adminProposersQuery.data.data.success) {
        const proposerData: AdminProposerType[] =
          adminProposersQuery.data.data.data;

        const proposerTableViewData: AdminProposerType[] = proposerData.map(
          (proposer: AdminProposerType, index) => ({ key: index, ...proposer }),
        );
        setProposers(proposerTableViewData);
      }
      setTotalDataCount(adminProposersQuery.data.data.pagination.totalCount);
    }
  };

  const proposersTableColumns: ColumnsType<AdminProposerType> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Birth Day",
      dataIndex: "birthDay",
      render: (value) => <span>{dayjs(value).format("YYYY/MM/DD")} </span>,
    },
    {
      title: "Membership Expiration",
      dataIndex: "membershipExpiration",
      render: (value) => (
        <span>{dayjs(value).format("YYYY/MM/DD HH:mm:ss")} </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <span>
          {value.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}{" "}
        </span>
      ),
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
      <div className="text-lg font-medium">Proposers</div>
      <div className="flex flex-row gap-20 my-4 p-4 bg-slate-100">
        <div>
          <div className="mb-2 font-medium">Proposer Status :</div>
          <Select
            defaultValue={ProposerStatusEnum.PendingPayment}
            onChange={(value) => {
              setProposerStatus(value), setCurrentPage(1);
            }}
            className="w-[200px]"
            options={Object.values(ProposerStatusEnum).map(
              (status: ProposerStatusEnum) => ({
                value: status,
                label: status
                  .replace(/([A-Z]+)/g, " $1")
                  .replace(/([A-Z][a-z])/g, " $1"),
              }),
            )}
          />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setIsOnlyExpired(e.target.checked)
              }
            >
              Only Expired
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setIsIncludePayments(e.target.checked)
              }
            >
              Include Payments
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) =>
                setOrderDesc(e.target.checked)
              }
            >
              Order Desc
            </Checkbox>
          </div>
        </div>
      </div>

      <div>
        <Table
          dataSource={proposers}
          columns={proposersTableColumns}
          scroll={{ x: true }}
          loading={adminProposersQuery.isPending}
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
}

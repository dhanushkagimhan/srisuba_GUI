import { Button, Checkbox, Popconfirm, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import {
  AdminApproveProposerPaymentType,
  AdminChangeProposerStatusType,
  AdminProposerType,
  ProposerStatusEnum,
  adminProposerPaymentType,
} from "../../../../../utility/typesAndEnum";
import dayjs from "dayjs";
import {
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
  useAdminGetProposals,
} from "../../../../../services/admin";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { PaymentViewModel, ProposalViewModel } from "./popupModels";

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

  const [isOpenPaymentViewModel, setIsOpenPaymentViewModel] =
    useState<boolean>(false);
  const [modelOpenedProposerId, setModelOpenedProposerId] = useState<number>();
  const [paymentDataForModel, setPaymentDataForModel] =
    useState<adminProposerPaymentType[]>();

  const [isOpenProposalViewModel, setIsOpenProposalViewModel] =
    useState<boolean>(false);
  const [proposerDataForModel, setProposerDataForModel] =
    useState<AdminProposerType>();

  const adminProposersQuery = useAdminGetProposals(
    currentPage,
    10,
    proposerStatus,
    isOnlyExpired,
    isIncludePayments,
    orderDesc,
  );

  const adminApproveProposerPaymentMutation = useAdminApproveProposerPayment();
  const adminChangeProposerStatusMutation = useAdminChangeProposerStatus();

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
    {
      title: "Payments",
      dataIndex: "payments",
      render: (value, record) => {
        if (isIncludePayments === false) {
          return <span>-</span>;
        } else {
          return (
            <span
              className="cursor-pointer font-medium hover:text-sky-400"
              onClick={() => openPaymentViewModel(record.id, value)}
            >
              View
            </span>
          );
        }
      },
    },
    {
      title: "Proposal",
      render: (_, record) => {
        if (
          proposerStatus === ProposerStatusEnum.PendingEmailVerification ||
          proposerStatus === ProposerStatusEnum.EmailVerified
        ) {
          return <span>-</span>;
        } else {
          return (
            <span
              className="cursor-pointer font-medium hover:text-sky-400"
              onClick={() => openProposalViewModel(record)}
            >
              View
            </span>
          );
        }
      },
    },
    {
      title: "Action",
      render: (_, record) => <div>{getTableActionColumn(record.id)}</div>,
    },
  ];

  const openPaymentViewModel = (
    id: number,
    paymentData: adminProposerPaymentType[],
  ) => {
    setModelOpenedProposerId(id);
    setPaymentDataForModel(paymentData);
    setIsOpenPaymentViewModel(true);
  };

  const openProposalViewModel = (proposerData: AdminProposerType) => {
    setProposerDataForModel(proposerData);
    setIsOpenProposalViewModel(true);
  };

  const getTableActionColumn = (proposerId: number) => {
    switch (proposerStatus) {
      case ProposerStatusEnum.PendingEmailVerification:
      case ProposerStatusEnum.EmailVerified:
        return "-";
      case ProposerStatusEnum.PendingPayment:
        return (
          <Popconfirm
            title="Approve payment"
            description="Are you sure to approve payment?"
            onConfirm={() => approveProposerPayment(proposerId)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Approve</Button>
          </Popconfirm>
        );
      case ProposerStatusEnum.PaymentApproved:
        return (
          <div className="flex flex-row gap-4">
            <div></div>
            <div>
              <Popconfirm
                title="Active proposal"
                description="Are you sure to active proposer?"
                onConfirm={() => changeProposerToActive(proposerId)}
                okText="Yes"
                cancelText="No"
              >
                <Button>Active</Button>
              </Popconfirm>
            </div>
          </div>
        );
      case ProposerStatusEnum.Active:
        return "gg";
      case ProposerStatusEnum.Rejected:
      case ProposerStatusEnum.Banned:
        return (
          <Popconfirm
            title="Active proposal"
            description="Are you sure to active proposer?"
            onConfirm={() => changeProposerToActive(proposerId)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Active</Button>
          </Popconfirm>
        );
      case ProposerStatusEnum.RejectionResolved:
        return (
          <div className="flex flex-row gap-4">
            <div></div>
            <div>
              <Popconfirm
                title="Active proposal"
                description="Are you sure to active proposer?"
                onConfirm={() => changeProposerToActive(proposerId)}
                okText="Yes"
                cancelText="No"
              >
                <Button>Active</Button>
              </Popconfirm>
            </div>
          </div>
        );
      case ProposerStatusEnum.BannedResolved:
        return (
          <div className="flex flex-row gap-4">
            <div></div>
            <div>
              <Popconfirm
                title="Active proposal"
                description="Are you sure to active proposer?"
                onConfirm={() => changeProposerToActive(proposerId)}
                okText="Yes"
                cancelText="No"
              >
                <Button>Active</Button>
              </Popconfirm>
            </div>
          </div>
        );
    }
  };

  const changeProposerToActive = (proposerId: number) => {
    const changeToActiveData: AdminChangeProposerStatusType = {
      proposerId: proposerId,
      status: ProposerStatusEnum.Active,
    };

    adminChangeProposerStatusMutation.mutate(changeToActiveData, {
      onSuccess: (data) => {
        if (data.data.success) {
          adminProposersQuery.refetch();
        }
      },
    });
  };

  const approveProposerPayment = (proposerId: number) => {
    const approveData: AdminApproveProposerPaymentType = {
      proposerId: proposerId,
    };

    adminApproveProposerPaymentMutation.mutate(approveData, {
      onSuccess: (data) => {
        if (data.data.success) {
          adminProposersQuery.refetch();
        }
      },
    });
  };

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

      <div>
        <PaymentViewModel
          isModalOpen={isOpenPaymentViewModel}
          setIdModelOpen={setIsOpenPaymentViewModel}
          proposerId={modelOpenedProposerId}
          paymentData={paymentDataForModel}
        />
      </div>

      <div>
        <ProposalViewModel
          isModalOpen={isOpenProposalViewModel}
          setIdModelOpen={setIsOpenProposalViewModel}
          proposer={proposerDataForModel}
        />
      </div>
    </div>
  );
}

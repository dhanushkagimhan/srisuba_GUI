import { Button, Checkbox, Table } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useAdminGetMarketers } from "../../../../../services/admin";
import { AdminMarketerType } from "../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import { getCountryLabel } from "../../../../../utility/Methods";
import dayjs from "dayjs";
import {
  MarketerReferredProposerViewModel,
  MarketerWithdrawModel,
  MarketerWithdrawalsViewModel,
} from "./popupModels";

export default function AdminMarketerView() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDataCount, setTotalDataCount] = useState<number>();
  const [isOnlyWithdrawAvailable, setIsOnlyWithdrawAvailable] =
    useState<boolean>(false);
  const [orderDesc, setOrderDesc] = useState<boolean>(false);
  const [marketers, setMarketers] = useState<AdminMarketerType[]>([]);

  const adminMarketersQuery = useAdminGetMarketers(
    currentPage,
    10,
    isOnlyWithdrawAvailable,
    orderDesc,
  );

  const [
    isOpenReferredProposersViewModel,
    setIsOpenReferredProposersViewModel,
  ] = useState<boolean>(false);
  const [marketerIDForModels, setMarketerIDForModels] = useState<number>();

  const [isOpenWithdrawalsViewModel, setIsOpenWithdrawalsViewModel] =
    useState<boolean>(false);

  const [isOpenWithdrawModel, setIsOpenWithdrawModel] =
    useState<boolean>(false);

  useEffect(() => {
    loadMarketersData();
  }, [currentPage, adminMarketersQuery.data]);

  const loadMarketersData = () => {
    if (adminMarketersQuery.isSuccess) {
      if (adminMarketersQuery.data.data.success) {
        const marketersData: AdminMarketerType[] =
          adminMarketersQuery.data.data.data;

        const marketersTableViewData: AdminMarketerType[] = marketersData.map(
          (marketer: AdminMarketerType, index) => ({ key: index, ...marketer }),
        );
        setMarketers(marketersTableViewData);
      }
      setTotalDataCount(adminMarketersQuery.data.data.pagination.totalCount);
    }
  };

  const marketersTableColumns: ColumnsType<AdminMarketerType> = [
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
      title: "Country",
      dataIndex: "country",
      render: (value) => <span>{getCountryLabel(value)} </span>,
    },
    {
      title: "Affiliate Code",
      dataIndex: "affiliateCode",
      render: (value) => <span>{value ?? "-"} </span>,
    },
    {
      title: "Account Balance",
      dataIndex: "accountBalance",
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
      title: "Referred Proposers",
      render: (_, record) => {
        return (
          <span
            className="cursor-pointer font-medium hover:text-sky-400"
            onClick={() => openReferredProposersModel(record.id)}
          >
            View
          </span>
        );
      },
    },
    {
      title: "Withdrawals",
      render: (_, record) => {
        return (
          <span
            className="cursor-pointer font-medium hover:text-sky-400"
            onClick={() => openWithdrawalsViewModel(record.id)}
          >
            View
          </span>
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => <div>{getTableActionColumn(record.id)}</div>,
    },
  ];

  const getTableActionColumn = (marketerId: number) => {
    if (isOnlyWithdrawAvailable) {
      return (
        <Button onClick={() => openWithdrawModel(marketerId)}>Withdraw</Button>
      );
    } else {
      return "-";
    }
  };

  const openWithdrawModel = (marketerId: number) => {
    setMarketerIDForModels(marketerId);
    setIsOpenWithdrawModel(true);
  };

  const openReferredProposersModel = (marketerId: number) => {
    setMarketerIDForModels(marketerId);
    setIsOpenReferredProposersViewModel(true);
  };

  const openWithdrawalsViewModel = (marketerId: number) => {
    setMarketerIDForModels(marketerId);
    setIsOpenWithdrawalsViewModel(true);
  };

  return (
    <div>
      <div className="text-lg font-medium">Affiliate marketers</div>
      <div className="my-4 p-4 bg-slate-100">
        <div className="flex flex-row gap-4 items-center">
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => {
                setIsOnlyWithdrawAvailable(e.target.checked), setCurrentPage(1);
              }}
            >
              Only Withdraw Available
            </Checkbox>
          </div>
          <div>
            <Checkbox
              onChange={(e: CheckboxChangeEvent) => {
                setOrderDesc(e.target.checked), setCurrentPage(1);
              }}
            >
              Order Desc
            </Checkbox>
          </div>
        </div>
      </div>

      <div>
        <Table
          dataSource={marketers}
          columns={marketersTableColumns}
          scroll={{ x: true }}
          loading={adminMarketersQuery.isPending}
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
        <MarketerReferredProposerViewModel
          isModalOpen={isOpenReferredProposersViewModel}
          setIdModelOpen={setIsOpenReferredProposersViewModel}
          marketerId={marketerIDForModels}
        />
      </div>

      <div>
        <MarketerWithdrawalsViewModel
          isModalOpen={isOpenWithdrawalsViewModel}
          setIdModelOpen={setIsOpenWithdrawalsViewModel}
          marketerId={marketerIDForModels}
        />
      </div>

      <div>
        <MarketerWithdrawModel
          isModalOpen={isOpenWithdrawModel}
          setIdModelOpen={setIsOpenWithdrawModel}
          marketerId={marketerIDForModels}
        />
      </div>
    </div>
  );
}

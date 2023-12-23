import { Modal, Table, Tag } from "antd";
import {
  PaymentStatusEnum,
  adminProposerPaymentType,
} from "../../../../../../utility/typesAndEnum";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type PaymentViewModelProps = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  proposerId?: number;
  paymentData?: adminProposerPaymentType[];
};

export default function PaymentViewModel(prop: PaymentViewModelProps) {
  const columns: ColumnsType<adminProposerPaymentType> = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Value",
      dataIndex: "value",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => {
        if (value === PaymentStatusEnum.Pending) {
          return <Tag color="orange">{PaymentStatusEnum.Pending}</Tag>;
        } else {
          return <Tag color="green">{PaymentStatusEnum.Approved}</Tag>;
        }
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value) => (
        <span>{dayjs(value).format("YYYY/MM/DD HH:mm:ss")} </span>
      ),
    },
  ];

  const getTableData = () => {
    let tableData: adminProposerPaymentType[] = [];

    if (prop.paymentData != null) {
      tableData = prop.paymentData?.map((payment, index) => ({
        key: index,
        ...payment,
      }));
    }

    return tableData;
  };

  const getContent = () => {
    return (
      <div>
        <div>
          <span className="font-medium">Proposer Id : </span>
          {prop.proposerId ?? ""}
        </div>
        <div className="mt-4">
          <Table
            dataSource={getTableData()}
            columns={columns}
            pagination={false}
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

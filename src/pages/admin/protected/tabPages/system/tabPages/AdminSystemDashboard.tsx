import { useEffect, useState } from "react";
import {
  useAdminGetSystemDetails,
  useAdminWithdrawSystemIncome,
} from "../../../../../../services/admin";
import {
  AdminSystemDetailsType,
  AdminWithdrawSystemIncomeType,
} from "../../../../../../utility/typesAndEnum";
import dayjs from "dayjs";
import { Alert, Button, Form, InputNumber } from "antd";
import { getMutationError } from "../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function AdminSystemDashboard() {
  const adminSystemDetailsQuery = useAdminGetSystemDetails();
  const [systemDetails, setSystemDetails] = useState<AdminSystemDetailsType>();

  const adminWithdrawSystemIncomeMutation = useAdminWithdrawSystemIncome();

  useEffect(() => {
    loadSystemData();
  }, [adminSystemDetailsQuery.data]);

  const loadSystemData = () => {
    if (adminSystemDetailsQuery.isSuccess) {
      if (adminSystemDetailsQuery.data.data.success) {
        setSystemDetails(adminSystemDetailsQuery.data.data.data);
      }
    }
  };

  const onSubmit = (values: AdminWithdrawSystemIncomeType) => {
    adminWithdrawSystemIncomeMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          adminSystemDetailsQuery.refetch();
        }
      },
    });
  };

  return (
    <div>
      <div className="text-lg font-medium">Dashboard</div>

      <div className="mt-4 p-4 rounded-lg bg-slate-100 flex flex-wrap gap-4">
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">System Income Balance</p>
          <p>{systemDetails?.systemIncomeBalance} LKR</p>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">Total System Account Balance</p>
          <p>{systemDetails?.totalSystemAccountBalance} LKR</p>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">Total Affiliate Marketers Cost</p>
          <p>{systemDetails?.totalAffiliateMarketersCost} LKR</p>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">Proposal Price</p>
          <p>{systemDetails?.proposalPrice} LKR</p>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">Created At</p>
          <p>{dayjs(systemDetails?.createdAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <p className="font-medium">Updated At</p>
          <p>{dayjs(systemDetails?.updatedAt).format("YYYY/MM/DD HH:mm:ss")}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-row justify-center">
        <div className="p-4 bg-slate-100 rounded-lg w-[500px]">
          <div>
            {adminWithdrawSystemIncomeMutation.isError ? (
              <div className="mb-4">
                <Alert
                  message={getMutationError(adminWithdrawSystemIncomeMutation)}
                  type="error"
                />
              </div>
            ) : (
              <></>
            )}
            {adminWithdrawSystemIncomeMutation.isSuccess ? (
              <div className="mb-4">
                <Alert message={"Successfully withdrawn"} type="success" />
              </div>
            ) : (
              <></>
            )}
          </div>
          <Form
            name="AdminWithdrawSystemIncomeForm"
            onFinish={onSubmit}
            className="flex flex-col gap-2"
            layout="vertical"
          >
            <Form.Item<AdminWithdrawSystemIncomeType>
              label="Amount"
              name="amount"
              rules={[
                { required: true, message: "Please input withdraw amount" },
                () => ({
                  validator(_, value) {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Amount must be grater than 0."),
                    );
                  },
                }),
              ]}
            >
              <InputNumber placeholder="Amount" className="py-2 w-full" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full pb-10 text-2xl font-medium"
              >
                {adminWithdrawSystemIncomeMutation.isPending ? (
                  <span className="text-lg mr-2">
                    <SyncOutlined spin />
                  </span>
                ) : (
                  <></>
                )}
                Withdraw
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

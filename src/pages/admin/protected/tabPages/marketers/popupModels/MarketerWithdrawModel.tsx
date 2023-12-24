import { Alert, Button, Form, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  useAdminGetMarketerBankAccount,
  useAdminWithdrawMarketerIncome,
} from "../../../../../../services/admin";
import {
  AdminMarketerBankAccountType,
  AdminWithdrawMarketerIncomeType,
} from "../../../../../../utility/typesAndEnum";
import { getMutationError } from "../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

type MarketerWithdrawModelProps = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  marketerId?: number;
  accountBalance?: number;
  refreshMarketersData: () => void;
};

export default function MarketerWithdrawModel(
  prop: MarketerWithdrawModelProps,
) {
  const [marketerBankAccount, setMarketerBankAccount] =
    useState<AdminMarketerBankAccountType>();

  const adminMarketerBankAccountQuery = useAdminGetMarketerBankAccount(
    prop.isModalOpen,
    prop.marketerId,
  );

  const AdminMarketerWithdrawIncomeMutation = useAdminWithdrawMarketerIncome();

  useEffect(() => {
    loadMarketerBankAccountData();
  }, [adminMarketerBankAccountQuery.data]);

  const loadMarketerBankAccountData = () => {
    if (adminMarketerBankAccountQuery.isSuccess) {
      if (adminMarketerBankAccountQuery.data.data.success) {
        setMarketerBankAccount(adminMarketerBankAccountQuery.data.data.data);
      }
    }
  };

  const onSubmit = (values: AdminWithdrawMarketerIncomeType) => {
    console.log(values);
    const withdrawData: AdminWithdrawMarketerIncomeType = {
      marketerId: prop.marketerId,
      amount: values.amount,
    };
    AdminMarketerWithdrawIncomeMutation.mutate(withdrawData, {
      onSuccess: (data) => {
        if (data.data.success) {
          prop.refreshMarketersData();
        }
      },
    });
  };

  const getMarketerBankAccount = () => {
    if (adminMarketerBankAccountQuery.isSuccess) {
      return (
        <div>
          <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg mt-2">
            <div className="font-medium w-full text-right">Bank Name</div>
            <div className="w-full">{marketerBankAccount?.bankName}</div>
          </div>
          <div className="flex flex-row gap-4 py-2">
            <div className="font-medium w-full text-right">Branch</div>
            <div className="w-full">{marketerBankAccount?.branch}</div>
          </div>
          <div className="flex flex-row gap-4 py-2 bg-slate-100 rounded-lg mt-2">
            <div className="font-medium w-full text-right">Account Number</div>
            <div className="w-full">{marketerBankAccount?.accountNumber}</div>
          </div>
          <div className="flex flex-row gap-4 py-2">
            <div className="font-medium w-full text-right">
              Account Holder Name
            </div>
            <div className="w-full">
              {marketerBankAccount?.accountHolderName}
            </div>
          </div>
        </div>
      );
    } else if (
      adminMarketerBankAccountQuery.isError &&
      adminMarketerBankAccountQuery?.error?.response.status === 404
    ) {
      return (
        <div className="font-medium text-center">
          Not configured bank account
        </div>
      );
    } else {
      return (
        <div className="text-center text-yellow-800 font-medium">
          Getting bank account not success.
        </div>
      );
    }
  };

  const getContent = () => {
    return (
      <div>
        <div>
          <div className="mb-4 font-medium text-lg">Withdraw income</div>
          <div>
            <span className="font-medium">MarketerId Id : </span>
            {prop.marketerId ?? ""}
          </div>
          <div>
            <span className="font-medium">Account balance : </span>
            {prop.accountBalance ?? ""}
          </div>
        </div>

        <div className="mt-4 pl-4">
          <div className="p-4 bg-slate-100 rounded-lg">
            {getMarketerBankAccount()}
          </div>
        </div>

        <div className="mt-4 flex flex-row justify-center">
          <div className="p-4 bg-slate-100 rounded-lg w-[500px]">
            <div>
              {AdminMarketerWithdrawIncomeMutation.isError ? (
                <div className="mb-4">
                  <Alert
                    message={getMutationError(
                      AdminMarketerWithdrawIncomeMutation,
                    )}
                    type="error"
                  />
                </div>
              ) : (
                <></>
              )}
              {AdminMarketerWithdrawIncomeMutation.isSuccess ? (
                <div className="mb-4">
                  <Alert message={"Successfully withdrawn!"} type="success" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <Form
              name="AdminLoginForm"
              onFinish={onSubmit}
              className="flex flex-col gap-2"
              layout="vertical"
            >
              <Form.Item<AdminWithdrawMarketerIncomeType>
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
                  {AdminMarketerWithdrawIncomeMutation.isPending ? (
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

import { Alert, Button, Form, Input } from "antd";
import { MarketerBankAccountType } from "../../../../../../../utility/typesAndEnum";
import {
  useMarketerCreateOrUpdateBankAccount,
  useMarketerGetBankAccount,
} from "../../../../../../../services/marketer";
import { useEffect, useState } from "react";
import { getMutationError } from "../../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function MarketerBankAccount() {
  const [isBankAccountAvailable, setIsBankAccountAvailable] =
    useState<boolean>(true);
  const marketerBankAccountQuery = useMarketerGetBankAccount(
    isBankAccountAvailable,
  );
  const [form] = Form.useForm();

  const marketerBankAccountCreateOrUpdateMutation =
    useMarketerCreateOrUpdateBankAccount();

  useEffect(() => {
    setBankAccount();
  }, [marketerBankAccountQuery]);

  const setBankAccount = () => {
    if (marketerBankAccountQuery.isSuccess) {
      if (marketerBankAccountQuery.data.data.success) {
        form.setFieldsValue({ ...marketerBankAccountQuery.data.data.data });
      }
    } else if (marketerBankAccountQuery.isError) {
      if (marketerBankAccountQuery.error.response.status === 404) {
        setIsBankAccountAvailable(false);
      }
    }
  };

  const onSubmit = (formValues: MarketerBankAccountType) => {
    marketerBankAccountCreateOrUpdateMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.data.success) {
          marketerBankAccountQuery.refetch();
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Bank Account</h2>
        {marketerBankAccountQuery?.error?.response.status === 404 ? (
          <div className="mb-4">
            <Alert
              message={
                "You must configure bank account details for the withdraw your incomes."
              }
              type="info"
              showIcon
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          {marketerBankAccountCreateOrUpdateMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(
                  marketerBankAccountCreateOrUpdateMutation,
                )}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
          {marketerBankAccountCreateOrUpdateMutation.isSuccess ? (
            <div className="mb-4">
              <Alert message={"Successfully updated profile."} type="success" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="marketerBankAccountForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
          form={form}
        >
          <Form.Item<MarketerBankAccountType>
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please input your bank name" }]}
          >
            <Input placeholder="First name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerBankAccountType>
            name="branch"
            label="Branch"
            rules={[{ required: true, message: "Please input branch" }]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerBankAccountType>
            name="accountHolderName"
            label="Account Holder Name"
            rules={[
              { required: true, message: "Please input account holder name" },
            ]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerBankAccountType>
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true, message: "Please input account number" }]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {marketerBankAccountCreateOrUpdateMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

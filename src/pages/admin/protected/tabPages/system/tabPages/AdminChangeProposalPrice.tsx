import { Alert, Button, Form, InputNumber } from "antd";
import { AdminChangeProposalPriceType } from "../../../../../../utility/typesAndEnum";
import { useProposalPriceStore } from "../../../../../../states";
import { useEffect } from "react";
import { useAdminChangeProposalPrice } from "../../../../../../services/admin";
import { getMutationError } from "../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function AdminChangeProposalPrice() {
  const proposalPriceState = useProposalPriceStore();
  const [form] = Form.useForm();
  const AdminChangeProposalPriceMutation = useAdminChangeProposalPrice();

  useEffect(() => {
    setFormData();
  }, []);

  const setFormData = () => {
    form.setFieldsValue({
      price: proposalPriceState.price,
    });
  };

  const onSubmit = (values: AdminChangeProposalPriceType) => {
    AdminChangeProposalPriceMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          proposalPriceState.setPrice(data.data.data.price);
        }
      },
    });
  };

  return (
    <div>
      <div className="text-lg font-medium">Change Proposal Price</div>

      <div className="mt-8 flex flex-row justify-center">
        <div className="p-4 bg-slate-100 rounded-lg w-[500px]">
          <div>
            {AdminChangeProposalPriceMutation.isError ? (
              <div className="mb-4">
                <Alert
                  message={getMutationError(AdminChangeProposalPriceMutation)}
                  type="error"
                />
              </div>
            ) : (
              <></>
            )}
            {AdminChangeProposalPriceMutation.isSuccess ? (
              <div className="mb-4">
                <Alert
                  message={"Successfully change proposal price"}
                  type="success"
                />
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
            form={form}
          >
            <Form.Item<AdminChangeProposalPriceType>
              label="Price (LKR)"
              name="price"
              rules={[
                { required: true, message: "Please input new price" },
                () => ({
                  validator(_, value) {
                    if (value > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Price must be grater than 0."),
                    );
                  },
                }),
              ]}
            >
              <InputNumber placeholder="Price" className="py-2 w-full" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full pb-10 text-2xl font-medium"
              >
                {AdminChangeProposalPriceMutation.isPending ? (
                  <span className="text-lg mr-2">
                    <SyncOutlined spin />
                  </span>
                ) : (
                  <></>
                )}
                Change Proposal Price
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

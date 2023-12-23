import { Button, Form, Input, Modal } from "antd";
import {
  AdminChangeProposerStatusType,
  ProposerStatusEnum,
} from "../../../../../../utility/typesAndEnum";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect } from "react";

type PaymentViewModelProps = {
  isModalOpen: boolean;
  setIdModelOpen: (value: boolean) => void;
  proposerId?: number;
  type?: ProposerStatusEnum.Rejected | ProposerStatusEnum.Banned;
  changeProposerStatus: (
    proposerId: number,
    proposerStatus:
      | ProposerStatusEnum.Active
      | ProposerStatusEnum.Rejected
      | ProposerStatusEnum.Banned,
    blockReason?: string,
  ) => void;
  isStateChangeMutationLoading: boolean;
};

export default function BlockProposerViewModel(prop: PaymentViewModelProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (prop.isModalOpen) {
      form.resetFields();
    }
  }, [prop.isModalOpen]);

  const onSubmit = (values: AdminChangeProposerStatusType) => {
    if (prop.proposerId != null && prop.type != null) {
      prop.changeProposerStatus(prop.proposerId, prop.type, values.reason);
    }
  };

  const getContent = () => {
    return (
      <div>
        <div>
          <span className="font-medium">Proposer Id : </span>
          {prop.proposerId ?? ""}
        </div>
        <div className="mt-4">
          <p className="font-medium">{prop.type} reason</p>
          <Form
            name="AdminLoginForm"
            onFinish={onSubmit}
            className="flex flex-col gap-2"
            layout="vertical"
            form={form}
          >
            <Form.Item<AdminChangeProposerStatusType>
              label="Reason"
              name="reason"
              rules={[{ required: true, message: "Please input reason" }]}
            >
              <Input.TextArea
                placeholder="reason"
                className="py-2"
                showCount
                maxLength={300}
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full pb-10 text-2xl font-medium"
              >
                {prop.isStateChangeMutationLoading ? (
                  <span className="text-lg mr-2">
                    <SyncOutlined spin />
                  </span>
                ) : (
                  <></>
                )}
                {prop.type === ProposerStatusEnum.Rejected ? "Reject" : "Ban"}
              </Button>
            </Form.Item>
          </Form>
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

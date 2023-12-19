import { Alert, Button, Form, Input } from "antd";
import { ProposerChangePasswordType } from "../../../../../../../utility/typesAndEnum";
import { useProposerChangePassword } from "../../../../../../../services/proposer";
import { SyncOutlined } from "@ant-design/icons";
import { getMutationError } from "../../../../../../../utility/Methods";

export default function ProposerChangePassword() {
  const proposerChangePasswordMutation = useProposerChangePassword();

  const onSubmit = (values: ProposerChangePasswordType) => {
    delete values.confirmNewPassword;

    proposerChangePasswordMutation.mutate(values);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Change Password</h2>
        <div>
          {proposerChangePasswordMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(proposerChangePasswordMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
          {proposerChangePasswordMutation.isSuccess ? (
            <div className="mb-4">
              <Alert
                message={"Successfully change the password."}
                type="success"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="proposerChangePasswordForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<ProposerChangePasswordType>
            name="currentPassword"
            label="Current Password"
            hasFeedback
            rules={[
              { required: true, message: "Please input current password!" },
              {
                min: 8,
                message: "password need to have more than 8 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="Current password"
              className="py-2 w-full"
            />
          </Form.Item>

          <div className="w-full h-[1px] bg-slate-200 shadow rounded mb-4"></div>

          <Form.Item<ProposerChangePasswordType>
            name="newPassword"
            label="New Password"
            hasFeedback
            rules={[
              { required: true, message: "Please input new password!" },
              {
                min: 8,
                message: "password need to have more than 8 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item<ProposerChangePasswordType>
            name="confirmNewPassword"
            label="Confirm New Password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input confirm new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The confirm new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerChangePasswordMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Change
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

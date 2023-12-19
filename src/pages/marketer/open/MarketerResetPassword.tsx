import { Alert, Button, Form, Input } from "antd";
import { useMainLayoutStore, useMarketerStore } from "../../../states";
import { useEffect } from "react";
import { MarketerResetPasswordType } from "../../../utility/typesAndEnum";
import { useNavigate } from "react-router-dom";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useMarketerResetPassword } from "../../../services/marketer";

export default function MarketerResetPassword() {
  const mainLayoutState = useMainLayoutStore();
  const marketerState = useMarketerStore();
  const navigate = useNavigate();
  const marketerResetPasswordMutation = useMarketerResetPassword();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (values: MarketerResetPasswordType) => {
    delete values.confirmNewPassword;
    const resetPasswordData: MarketerResetPasswordType = {
      ...values,
      email: marketerState.data?.email,
    };
    marketerResetPasswordMutation.mutate(resetPasswordData);
  };

  const getAlert = () => {
    if (marketerResetPasswordMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(marketerResetPasswordMutation)}
            type="error"
          />
        </div>
      );
    } else if (marketerResetPasswordMutation.isSuccess) {
      return (
        <div className="mb-4">
          <Alert
            message={
              <p>
                Password reset successfully.{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => navigate("/marketer")}
                >
                  Go to Login
                </span>
              </p>
            }
            type="success"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Reset Password</h2>
        <div>{getAlert()}</div>
        <Form
          name="marketerResetPasswordForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<MarketerResetPasswordType>
            name="code"
            label="Email Verification Code"
            tooltip="Check your Email inbox"
            rules={[
              { required: true, message: "Please input verification code" },
              {
                len: 6,
                message: "Verification code must have 6 characters",
              },
              () => ({
                validator(_, value) {
                  if (Number(value) >= 100000 && Number(value) < 1000000) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error("Validation code must be 6 digit number"),
                    );
                  }
                },
              }),
            ]}
          >
            <Input placeholder="Verification code" className="py-2" />
          </Form.Item>

          <div className="w-full h-[1px] bg-slate-200 shadow rounded mb-4"></div>

          <Form.Item<MarketerResetPasswordType>
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

          <Form.Item<MarketerResetPasswordType>
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
              placeholder="Confirm new Password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {marketerResetPasswordMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Reset
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p
            className="text-sky-500 cursor-pointer hover:text-sky-400"
            onClick={() => navigate("/marketer-forgot-password")}
          >
            Resend Verification code
          </p>
        </div>
      </div>
    </div>
  );
}

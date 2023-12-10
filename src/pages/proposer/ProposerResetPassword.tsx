import { Alert, Button, Form, Input } from "antd";
import { useMainLayoutStore, useProposerStore } from "../../states";
import { useEffect } from "react";
import { ProposerResetPasswordType } from "../../utility/types";
import { useNavigate } from "react-router-dom";
import { useProposerResetPassword } from "../../services/proposer";
import { getMutationError } from "../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function ProposerResetPassword() {
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const navigate = useNavigate();
  const proposerResetPasswordMutation = useProposerResetPassword();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  const onSubmit = (values: ProposerResetPasswordType) => {
    delete values.confirmNewPassword;
    const resetPasswordData: ProposerResetPasswordType = {
      ...values,
      email: proposerState.data?.email,
    };
    proposerResetPasswordMutation.mutate(resetPasswordData);
  };

  const getAlert = () => {
    if (proposerResetPasswordMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(proposerResetPasswordMutation)}
            type="error"
          />
        </div>
      );
    } else if (proposerResetPasswordMutation.isSuccess) {
      return (
        <div className="mb-4">
          <Alert
            message={
              <p>
                Password reset successfully.{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => navigate("/")}
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
          name="loginForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<ProposerResetPasswordType>
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

          <Form.Item<ProposerResetPasswordType>
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
              placeholder="Confirm password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item<ProposerResetPasswordType>
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
            <Input.Password placeholder="Password" className="py-2 w-full" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerResetPasswordMutation.isPending ? (
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
            onClick={() => navigate("/proposer-forgot-password")}
          >
            Resend Verification code
          </p>
        </div>
      </div>
    </div>
  );
}

import { Alert, Button, Form, Input } from "antd";
import { useEffect } from "react";
import {
  MarketerData,
  useMainLayoutStore,
  useMarketerStore,
} from "../../../states";
import { MarketerForgotPasswordType } from "../../../utility/typesAndEnum";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMarketerForgotPassword } from "../../../services/marketer";

export default function MarketerForgotPassword() {
  const mainLayoutState = useMainLayoutStore();
  const marketerState = useMarketerStore();
  const marketerForgotPasswordMutation = useMarketerForgotPassword();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/marketer",
    });
  }, []);

  const onSubmit = (values: MarketerForgotPasswordType) => {
    marketerForgotPasswordMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          const marketerData: MarketerData = data.data.data;
          marketerState.setData(marketerData);
          // navigate("/proposer-reset-password");
          console.log("yeyyyyyy");
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Forgotten Password</h2>
        <p>
          Please add your Email and send your password reset code to your email.
        </p>
        <div>
          {marketerForgotPasswordMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(marketerForgotPasswordMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="proposerForgotPasswordForm"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{ email: marketerState.data?.email }}
          className="flex flex-col gap-2"
        >
          <Form.Item<MarketerForgotPasswordType>
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your Email" },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input type="email" placeholder="Your Email" className="py-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {marketerForgotPasswordMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

import { Alert, Button, Form, Input } from "antd";
import { useEffect } from "react";
import {
  ProposerData,
  useMainLayoutStore,
  useProposerStore,
} from "../../../states";
import { ProposerForgotPasswordType } from "../../../utility/types";
import { useProposerForgotPassword } from "../../../services/proposer";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ProposerForgotPassword() {
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const proposerForgotPasswordMutation = useProposerForgotPassword();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  const onSubmit = (values: ProposerForgotPasswordType) => {
    proposerForgotPasswordMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerData: ProposerData = data.data.data;
          proposerState.setData(proposerData);
          navigate("/proposer-reset-password");
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
          {proposerForgotPasswordMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(proposerForgotPasswordMutation)}
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
          initialValues={{ email: proposerState.data?.email }}
          className="flex flex-col gap-2"
        >
          <Form.Item<ProposerForgotPasswordType>
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
              {proposerForgotPasswordMutation.isPending ? (
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

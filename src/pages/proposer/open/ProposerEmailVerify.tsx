import { useEffect } from "react";
import {
  ProposerData,
  useMainLayoutStore,
  useProposerStore,
} from "../../../states";
import { Alert, Button, Form, Input } from "antd";
import {
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
} from "../../../utility/typesAndEnum";
import {
  useProposerEmailVerify,
  useProposerRegenEmailVerify,
} from "../../../services/proposer";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ProposerEmailVerify() {
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const proposerEmailVerifyMutation = useProposerEmailVerify();
  const proposerRegenEmailVerifyMutation = useProposerRegenEmailVerify();
  const [_, setCookie] = useCookies(["proposerJwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (values: ProposerEmailVerifyType) => {
    const emailVerifyData: ProposerEmailVerifyType = {
      email: proposerState.data?.email,
      code: values.code,
    };

    proposerEmailVerifyMutation.mutate(emailVerifyData, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerData: ProposerData = data.data.data;
          proposerState.setData(proposerData);
          setCookie("proposerJwt", proposerData.accessToken, {
            expires: dayjs().add(1, "h").toDate(),
          });
          navigate("/cu-proposal");
        }
      },
    });
  };

  const regenEmailVerify = () => {
    const regenEmailVerify: ProposerRegenEmailVerifyType = {
      email: proposerState.data?.email,
    };

    proposerRegenEmailVerifyMutation.mutate(regenEmailVerify);
  };

  const getEmailVerifyAlert = () => {
    if (proposerEmailVerifyMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(proposerEmailVerifyMutation)}
            type="error"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getResendEmailVerifyAlert = () => {
    if (proposerRegenEmailVerifyMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(proposerRegenEmailVerifyMutation)}
            type="error"
          />
        </div>
      );
    } else if (proposerRegenEmailVerifyMutation.isSuccess) {
      return (
        <div className="mb-4">
          <Alert
            message="Email Verification code again sent successfully. Check your email inbox"
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
        <h2 className="text-2xl font-semibold">Email verification</h2>
        <p>
          Email verification code sent to your Email. Please check your email
          inbox.
        </p>
        <div>{getEmailVerifyAlert()}</div>
        <div>{getResendEmailVerifyAlert()}</div>
        <Form
          name="proposerEmailVerifyForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<ProposerEmailVerifyType>
            name="code"
            label="Email Verification Code"
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
            <Input placeholder="Email verification code" className="py-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerEmailVerifyMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Verify
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p
            className="text-sky-500 cursor-pointer hover:text-sky-400"
            onClick={regenEmailVerify}
          >
            Resend Email verification code
            {proposerRegenEmailVerifyMutation.isPending ? (
              <span className="ml-2">
                <SyncOutlined spin />
              </span>
            ) : (
              <></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

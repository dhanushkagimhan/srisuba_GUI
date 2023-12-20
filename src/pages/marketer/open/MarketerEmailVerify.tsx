import { useEffect } from "react";
import {
  MarketerData,
  useMainLayoutStore,
  useMarketerStore,
} from "../../../states";
import { Alert, Button, Form, Input } from "antd";
import {
  MarketerEmailVerifyType,
  MarketerRegenEmailVerifyType,
} from "../../../utility/typesAndEnum";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useMarketerEmailVerify,
  useMarketerRegenEmailVerify,
} from "../../../services/marketer";

export default function MarketerEmailVerify() {
  const mainLayoutState = useMainLayoutStore();
  const marketerState = useMarketerStore();
  const marketerEmailVerifyMutation = useMarketerEmailVerify();
  const marketerRegenEmailVerifyMutation = useMarketerRegenEmailVerify();
  const [_, setCookie] = useCookies(["marketerJwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (values: MarketerEmailVerifyType) => {
    const emailVerifyData: MarketerEmailVerifyType = {
      email: marketerState.data?.email,
      code: values.code,
    };

    marketerEmailVerifyMutation.mutate(emailVerifyData, {
      onSuccess: (data) => {
        if (data.data.success) {
          const marketerData: MarketerData = data.data.data;
          marketerState.setData(marketerData);
          setCookie("marketerJwt", marketerData.accessToken, {
            expires: dayjs().add(1, "h").toDate(),
          });
          navigate("/marketer-create-affiliate-code");
        }
      },
    });
  };

  const regenEmailVerify = () => {
    const regenEmailVerify: MarketerRegenEmailVerifyType = {
      email: marketerState.data?.email,
    };

    marketerRegenEmailVerifyMutation.mutate(regenEmailVerify);
  };

  const getEmailVerifyAlert = () => {
    if (marketerEmailVerifyMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(marketerEmailVerifyMutation)}
            type="error"
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getResendEmailVerifyAlert = () => {
    if (marketerRegenEmailVerifyMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(marketerRegenEmailVerifyMutation)}
            type="error"
          />
        </div>
      );
    } else if (marketerRegenEmailVerifyMutation.isSuccess) {
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
          name="marketerEmailVerifyForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<MarketerEmailVerifyType>
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
              {marketerEmailVerifyMutation.isPending ? (
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
            {marketerRegenEmailVerifyMutation.isPending ? (
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

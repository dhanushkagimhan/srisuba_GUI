import { useEffect } from "react";
import { useAdminStore, useMainLayoutStore } from "../../../states";
import { Alert, Button, Form, Input } from "antd";
import { AdminLoginVerifyType } from "../../../utility/typesAndEnum";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminLoginVerify } from "../../../services/admin";

export default function AdminLoginVerify() {
  const mainLayoutState = useMainLayoutStore();
  const adminState = useAdminStore();
  const adminLoginVerifyMutation = useAdminLoginVerify();
  const [_, setCookie] = useCookies(["adminJwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (values: AdminLoginVerifyType) => {
    const loginVerifyData: AdminLoginVerifyType = {
      email: adminState.email,
      code: values.code,
    };
    adminLoginVerifyMutation.mutate(loginVerifyData, {
      onSuccess: (data) => {
        if (data.data.success) {
          const accessToken: string = data.data.data.accessToken;
          setCookie("adminJwt", accessToken, {
            expires: dayjs().add(1, "h").toDate(),
          });
          navigate("/gimhan-home");
        }
      },
    });
  };

  const getEmailVerifyAlert = () => {
    if (adminLoginVerifyMutation.isError) {
      return (
        <div className="mb-4">
          <Alert
            message={getMutationError(adminLoginVerifyMutation)}
            type="error"
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
        <div>{getEmailVerifyAlert()}</div>
        <Form
          name="AdminEmailVerifyForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<AdminLoginVerifyType>
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
              {adminLoginVerifyMutation.isPending ? (
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
      </div>
    </div>
  );
}

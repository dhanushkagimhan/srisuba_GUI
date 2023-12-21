import { Alert, Button, Form, Input } from "antd";
import { AdminLoginType } from "../../../utility/typesAndEnum";
import { useAdminStore, useMainLayoutStore } from "../../../states";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "../../../services/admin";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function AdminLogin() {
  const mainLayoutState = useMainLayoutStore();
  const navigate = useNavigate();
  const adminLoginMutation = useAdminLogin();
  const adminState = useAdminStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  const onSubmit = (values: AdminLoginType) => {
    adminLoginMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          adminState.setEmail(values.email);
          navigate("#");
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center mt-20">
      <div className="md:w-3/5 w-full">
        <div>
          {adminLoginMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(adminLoginMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="marketerLoginForm"
          onFinish={onSubmit}
          className="flex flex-col gap-2"
        >
          <Form.Item<AdminLoginType>
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Please input your email" },
            ]}
          >
            <Input type="email" placeholder="Email" className="py-2" />
          </Form.Item>

          <Form.Item<AdminLoginType>
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "password need to have more than 8 characters",
              },
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
              {adminLoginMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

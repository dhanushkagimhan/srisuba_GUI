import { Button, Form, Input } from "antd";
import { AdminLoginType } from "../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../states";
import { useEffect } from "react";

export default function AdminLogin() {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  return (
    <div className="flex flex-row justify-center mt-20">
      <div className="lg:w-1/3 w-full">
        <div>
          {/* {marketerLoginMutation.isError ? (
          <div className="xl:w-3/5 w-full mb-4">
            <Alert
              message={getMutationError(marketerLoginMutation)}
              type="error"
            />
          </div>
        ) : (
          <></>
        )} */}
        </div>
        <Form
          name="marketerLoginForm"
          // onFinish={onSubmit}
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
              {/* {marketerLoginMutation.isPending ? (
              <span className="text-lg mr-2">
                <SyncOutlined spin />
              </span>
            ) : (
              <></>
            )} */}
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
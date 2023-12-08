import { Button, Form, Input } from "antd";
import { ProposerRegisterType } from "../../utility/types";

export default function ProposerRegister() {
  const onSubmit = (values: ProposerRegisterType) => {
    console.log(values);
  };
  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2>Register</h2>

        <Form
          name="loginForm"
          onFinish={onSubmit}
          layout="vertical"
          autoComplete="off"
          className="flex flex-col gap-2"
        >
          <Form.Item<ProposerRegisterType>
            name="email"
            label="Email"
            labelAlign="right"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input type="email" placeholder="Email" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="password"
            label="Password"
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

          <Form.Item<ProposerRegisterType>
            name="password"
            label="Password"
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
              {/* {proposerLoginMutation.isPending ? (
              <span className="text-lg mr-2">
                <SyncOutlined spin />
              </span>
            ) : (
              <></>
            )} */}
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

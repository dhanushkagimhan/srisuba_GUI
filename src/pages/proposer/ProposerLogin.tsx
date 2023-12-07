import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { ProposerLoginType } from "../../utility/types";
import { SyncOutlined } from "@ant-design/icons";
import { useProposerLogin } from "../../services/proposer";

export default function ProposerLogin() {
  const proposerLoginMutation = useProposerLogin();

  const onFinish = (values: ProposerLoginType) => {
    console.log("Success:", values);
    proposerLoginMutation.mutate(values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Login</div>
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="xl:w-3/5 w-full flex flex-col gap-2"
      >
        <Form.Item<ProposerLoginType>
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input type="email" placeholder="Email" className="py-2" />
        </Form.Item>

        <Form.Item<ProposerLoginType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" className="py-2 w-full" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full pb-10 text-2xl font-medium"
          >
            {proposerLoginMutation.isPending ? <SyncOutlined spin /> : <></>}{" "}
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="-mt-5">
        <Link to="#" className="no-underline text-sky-500">
          <p>Forgotten password?</p>
        </Link>
      </div>
      <div className="-mt-2">
        <Link to="#" className="no-underline text-sky-500">
          <p>Still not posted my proposal, Post my proposal</p>
        </Link>
      </div>
    </div>
  );
}

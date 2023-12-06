import { Button, Form, Input } from "antd";
import MainLayout from "../utility/components/mainLayout/MainLayout";
import HomeMenu from "../utility/components/navMenus/home/HomeMenu";
import { Link } from "react-router-dom";

interface FieldType {
  email?: string;
  password?: string;
}

export default function Home() {
  const onFinish = (values: unknown) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <MainLayout navMenu={<HomeMenu />} showFooter={true} showMarketing={true}>
      <div className="flex flex-row max-md:flex-col md:justify-between h-[70vh]">
        <div className="w-full md:pt-20 lg:pl-20">
          <h1 className="text-6xl text-neutral-900">Srisuba</h1>
          <p className="text-neutral-900 -mt-5 text-xl font-medium">
            The matrimonial proposal service
          </p>
        </div>
        <div className="w-full pt-20 xl:pl-40">
          <div className="text-2xl font-semibold mb-5">Login</div>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="xl:w-3/5 w-full flex flex-col gap-2"
          >
            <Form.Item<FieldType>
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input type="email" placeholder="Email" className="py-2" />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
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
      </div>
    </MainLayout>
  );
}

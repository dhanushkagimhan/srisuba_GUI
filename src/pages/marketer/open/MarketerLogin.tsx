import { Alert, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MarketerLoginType,
  MarketerStatusEnum,
} from "../../../utility/typesAndEnum";
import { SyncOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getMutationError } from "../../../utility/Methods";
import { MarketerData, useMarketerStore } from "../../../states";
import { useMarketerLogin } from "../../../services/marketer";

export default function MarketerLogin() {
  const marketerLoginMutation = useMarketerLogin();
  const marketerState = useMarketerStore();
  const [_, setCookie] = useCookies(["marketerJwt"]);
  const navigate = useNavigate();

  const onSubmit = (values: MarketerLoginType) => {
    marketerLoginMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          const marketerData: MarketerData = data.data.data;

          if (
            marketerData.status == null ||
            (marketerData.status !==
              MarketerStatusEnum.PendingEmailVerification &&
              marketerData.accessToken == null)
          ) {
            navigate("/error-500");
          } else {
            marketerState.setData(marketerData);

            if (
              marketerData.status !==
              MarketerStatusEnum.PendingEmailVerification
            ) {
              setCookie("marketerJwt", marketerData.accessToken, {
                expires: dayjs().add(1, "h").toDate(),
              });
            }

            switch (marketerData.status) {
              case MarketerStatusEnum.PendingEmailVerification: {
                console.log("email verify page");
                navigate("#");
                break;
              }
              case MarketerStatusEnum.EmailVerified: {
                console.log("marketer home");
                navigate("#");
                break;
              }
            }
          }
        }
      },
    });
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-5">Login</div>
      <div>
        {marketerLoginMutation.isError ? (
          <div className="xl:w-3/5 w-full mb-4">
            <Alert
              message={getMutationError(marketerLoginMutation)}
              type="error"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Form
        name="loginForm"
        onFinish={onSubmit}
        className="xl:w-3/5 w-full flex flex-col gap-2"
      >
        <Form.Item<MarketerLoginType>
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

        <Form.Item<MarketerLoginType>
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "password need to have more than 8 characters" },
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
            {marketerLoginMutation.isPending ? (
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
      <div className="-mt-5">
        <Link to="#" className="no-underline text-sky-500 hover:text-sky-400">
          <p>Forgotten password?</p>
        </Link>
      </div>
      <div className="-mt-2">
        <Link
          to="/marketer-register"
          className="no-underline text-sky-500 hover:text-sky-400"
        >
          <p>Still not registered. Register now.</p>
        </Link>
      </div>
    </div>
  );
}

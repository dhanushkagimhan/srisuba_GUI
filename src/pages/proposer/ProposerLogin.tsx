import { Alert, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ProposerLoginType, ProposerStatusEnum } from "../../utility/types";
import { SyncOutlined } from "@ant-design/icons";
import { useProposerLogin } from "../../services/proposer";
import useProposerStore, {
  ProposerData,
} from "../../states/proposer/useProposerStore";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";
import { getMutationError } from "../../utility/Methods";

export default function ProposerLogin() {
  const proposerLoginMutation = useProposerLogin();
  const proposerState = useProposerStore();
  const [_, setCookie] = useCookies(["proposerJwt"]);
  const navigate = useNavigate();

  const onSubmit = (values: ProposerLoginType) => {
    proposerLoginMutation.mutate(values, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerData: ProposerData = data.data.data;
          proposerState.setData(proposerData);

          if (
            proposerData.status !== ProposerStatusEnum.PendingEmailVerification
          ) {
            setCookie("proposerJwt", proposerData.accessToken, {
              expires: dayjs().add(1, "h").toDate(),
            });
          }

          switch (proposerData.status) {
            case ProposerStatusEnum.PendingEmailVerification: {
              navigate("/proposer-email-verify");
              break;
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
        {proposerLoginMutation.isError ? (
          <div className="xl:w-3/5 w-full mb-4">
            <Alert
              message={getMutationError(proposerLoginMutation)}
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
        <Form.Item<ProposerLoginType>
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

        <Form.Item<ProposerLoginType>
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
            {proposerLoginMutation.isPending ? (
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
          to="/proposer-register"
          className="no-underline text-sky-500 hover:text-sky-400"
        >
          <p>Still not posted my proposal, Post my proposal</p>
        </Link>
      </div>
    </div>
  );
}

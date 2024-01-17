import { Alert, Button, DatePicker, Form, Input, Select } from "antd";
import {
  GenderEnum,
  ProposerRegisterType,
} from "../../../utility/typesAndEnum";
import { useEffect } from "react";
import {
  ProposerData,
  useMainLayoutStore,
  useProposerStore,
} from "../../../states";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { useProposerRegister } from "../../../services/proposer";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { systemContactNumber } from "../../../utility/const";

const { Option } = Select;

export default function ProposerRegister() {
  const [cookies] = useCookies(["ref"]);
  const proposerRegisterMutation = useProposerRegister();
  const mainLayoutState = useMainLayoutStore();
  const proposerState = useProposerStore();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: true,
      showMarketing: true,
      logoLink: "/",
    });
  }, []);

  const onSubmit = (formValues: ProposerRegisterType) => {
    formValues.birthDay = dayjs(formValues.birthDay).format("MM/DD/YYYY");

    if (cookies.ref != null) {
      formValues.referralCode = cookies.ref;
    }

    delete formValues.confirmPassword;

    proposerRegisterMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerData: ProposerData = data.data.data;
          proposerState.setData(proposerData);
          navigate("/proposer-email-verify");
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <p>
          ආයුබෝවන්!! ලංකාවේ විශ්වාසනීයම මංගල යෝජනා සේවයට ඇතුලත් වීමට පැමිණෙන ඔබව
          සාදරයෙන් පිළිගන්නෙමු.
        </p>
        <h2 className="text-2xl font-semibold">Registration</h2>
        <p>
          ( මුලිම්ම srisuba.com වෙබ් අඩවියෙහි ගිණුමක් සකසා ගනිමු. ඒ සදහා ඔබ පහත
          form එක පුරවා Register බටන් එක press කරන්න. ඔබට ගිණුම සැකසීමේදි යම්
          ගැටලුවක් මතු වුනොත් {systemContactNumber} වෙත අමතන්න. )
        </p>
        <div>
          {proposerRegisterMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(proposerRegisterMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="proposerRegisterForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <p>( පලමුවෙන්, ඔබගේ භාවිතා කරන email ලිපිනය ඇතුලත් කරන්න. )</p>
          <Form.Item<ProposerRegisterType>
            name="email"
            label="Email ( ඔබගේ email ලිපිනය )"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input type="email" placeholder="Email" className="py-2" />
          </Form.Item>

          <p>( දැන්, ඔබ සකසන srisuba.com ගිණුමට නව මුරපදයක් සකසා ගත යුතුය. )</p>
          <Form.Item<ProposerRegisterType>
            name="password"
            label="Password ( නව මුරපදයක් ඇතුලත් කරන්න. ඔබගේ නව මුර පදය අකුරු 8 කට වඩා දිග විය යුතුය. )"
            hasFeedback
            rules={[
              { required: true, message: "Please input password!" },
              {
                min: 8,
                message: "password need to have more than 8 characters",
              },
            ]}
          >
            <Input.Password placeholder="Password" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="confirmPassword"
            label="Confirm Password (නැවතත්, පෙර ඇතුලත් කරපු නව මුර පදයම ඇතුලත් කරන්න)"
            hasFeedback
            rules={[
              { required: true, message: "Please input confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The confirm password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="firstName"
            label="First Name ( ඔබගේ නමේ මුල් කොටස ඇතුලත් කරන්න )"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="lastName"
            label="Last Name ( ඔබගේ නමේ දෙවන කොටස ඇතුලත් කරන්න )"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="birthDay"
            label="Birthday ( ඔබගේ උපන් දිනය ඇතුලත් කරන්න )"
            rules={[
              { required: true, message: "Please input your Birthday!" },
              () => ({
                validator(_, value) {
                  const dob = dayjs(value);
                  const age = dayjs().diff(dob, "year");

                  if (age < 18) {
                    return Promise.reject(
                      new Error("Age must be older than 18 years!"),
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <DatePicker className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerRegisterType>
            name="gender"
            label="Gender ( ඔබගේ ස්ත්‍රී / පුරුෂ භාවය ඇතුලත් කරන්න )"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value={GenderEnum.Male}>Male</Option>
              <Option value={GenderEnum.Female}>Female</Option>
            </Select>
          </Form.Item>

          {cookies.ref == null ? (
            <Form.Item<ProposerRegisterType>
              name="referralCode"
              label="Referral Code ( මෙම කොටස පිරවීම අන්වාර්ය නැත )"
              tooltip="If you have a referral code, add it. If haven't, don't worry. Go forward."
            >
              <Input placeholder="Referral code" className="py-2 w-full" />
            </Form.Item>
          ) : (
            <></>
          )}

          <p>
            {" "}
            ( දැන් ඔබගේ ගිණුම සැකසීම සදහා පහත Register බටන් එක press කරන්න. ){" "}
          </p>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerRegisterMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

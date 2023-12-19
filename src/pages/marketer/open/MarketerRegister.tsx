import { Alert, Button, Form, Input, Select } from "antd";
import {
  GenderEnum,
  MarketerRegisterType,
} from "../../../utility/typesAndEnum";
import { useEffect } from "react";
import {
  MarketerData,
  useMainLayoutStore,
  useMarketerStore,
} from "../../../states";
import { getMutationError } from "../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { countries } from "../../../utility/const";
import { useMarketerRegister } from "../../../services/marketer";

const { Option } = Select;

export default function MarketerRegister() {
  const marketerRegisterMutation = useMarketerRegister();
  const mainLayoutState = useMainLayoutStore();
  const marketerState = useMarketerStore();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "/marketer",
    });
  }, []);

  const onSubmit = (formValues: MarketerRegisterType) => {
    delete formValues.confirmPassword;

    marketerRegisterMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.data.success) {
          const marketerData: MarketerData = data.data.data;
          marketerState.setData(marketerData);
          navigate("/marketer-email-verify");
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Registration</h2>
        <div>
          {marketerRegisterMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(marketerRegisterMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="marketerRegisterForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<MarketerRegisterType>
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input type="email" placeholder="Email" className="py-2" />
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="password"
            label="Password"
            hasFeedback
            rules={[
              { required: true, message: "Please input password!" },
              {
                min: 8,
                message: "password need to have more than 8 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              className="py-2 w-full"
            />
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="confirmPassword"
            label="Confirm Password"
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
            <Input.Password placeholder="Password" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value={GenderEnum.Male}>Male</Option>
              <Option value={GenderEnum.Female}>Female</Option>
            </Select>
          </Form.Item>

          <Form.Item<MarketerRegisterType>
            name="country"
            label="Country"
            rules={[{ required: true, message: "Please select your country" }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase(),
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={countries}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {marketerRegisterMutation.isPending ? (
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

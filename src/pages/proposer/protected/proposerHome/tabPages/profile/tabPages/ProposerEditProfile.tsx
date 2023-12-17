import { Alert, Button, DatePicker, Form, Input } from "antd";
import {
  ProposerEditProfileResponseType,
  ProposerEditProfileType,
} from "../../../../../../../utility/typesAndEnum";
import dayjs from "dayjs";
import { ProposerData, useProposerStore } from "../../../../../../../states";
import { useEffect } from "react";
import { useProposerProfileEdit } from "../../../../../../../services/proposer";
import { getMutationError } from "../../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

export default function ProposerEditProfile() {
  const [form] = Form.useForm();
  const proposerState = useProposerStore();
  const proposerProfileEditMutation = useProposerProfileEdit();

  useEffect(() => {
    setFormData();
  }, []);

  const setFormData = () => {
    form.setFieldsValue({
      firstName: proposerState.data?.firstName,
      lastName: proposerState.data?.lastName,
      birthDay: dayjs(proposerState.data?.birthDay),
    });
  };

  const onSubmit = (formValues: ProposerEditProfileType) => {
    formValues.birthDay = dayjs(formValues.birthDay).format("MM/DD/YYYY");

    proposerProfileEditMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerNewData: ProposerEditProfileResponseType =
            data.data.data;

          if (proposerState.data != null) {
            const proposerNewStateData: ProposerData = proposerState.data;

            proposerNewStateData.firstName = proposerNewData.firstName;
            proposerNewStateData.lastName = proposerNewData.lastName;
            proposerNewStateData.birthDay = proposerNewData.birthDay;

            proposerState.setData(proposerNewStateData);
          }
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <div>
          {proposerProfileEditMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(proposerProfileEditMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
          {proposerProfileEditMutation.isSuccess ? (
            <div className="mb-4">
              <Alert message={"Successfully updated profile."} type="success" />
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
          form={form}
        >
          <Form.Item<ProposerEditProfileType>
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerEditProfileType>
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<ProposerEditProfileType>
            name="birthDay"
            label="Birthday"
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerProfileEditMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

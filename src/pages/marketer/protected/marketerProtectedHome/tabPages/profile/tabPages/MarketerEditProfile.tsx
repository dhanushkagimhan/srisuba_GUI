import { Alert, Button, Form, Input, Select } from "antd";
import { MarketerEditProfileType } from "../../../../../../../utility/typesAndEnum";
import { MarketerData, useMarketerStore } from "../../../../../../../states";
import { useEffect } from "react";
import { getMutationError } from "../../../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";
import { countries } from "../../../../../../../utility/const";
import { useMarketerProfileEdit } from "../../../../../../../services/marketer";

export default function MarketerEditProfile() {
  const [form] = Form.useForm();
  const marketerState = useMarketerStore();
  const marketerProfileEditMutation = useMarketerProfileEdit();

  useEffect(() => {
    setFormData();
  }, []);

  const setFormData = () => {
    form.setFieldsValue({
      firstName: marketerState.data?.firstName,
      lastName: marketerState.data?.lastName,
      country: marketerState.data?.country,
    });
  };

  const onSubmit = (formValues: MarketerEditProfileType) => {
    marketerProfileEditMutation.mutate(formValues, {
      onSuccess: (data) => {
        if (data.data.success) {
          const marketerNewData: MarketerEditProfileType = data.data.data;
          if (marketerState.data != null) {
            const marketerNewStateData: MarketerData = marketerState.data;
            marketerNewStateData.firstName = marketerNewData.firstName;
            marketerNewStateData.lastName = marketerNewData.lastName;
            marketerNewStateData.country = marketerNewData.country;
            marketerState.setData(marketerNewStateData);
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
          {marketerProfileEditMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(marketerProfileEditMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
          {marketerProfileEditMutation.isSuccess ? (
            <div className="mb-4">
              <Alert message={"Successfully updated profile."} type="success" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="marketerProfileEditForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
          form={form}
        >
          <Form.Item<MarketerEditProfileType>
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerEditProfileType>
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last name" className="py-2 w-full" />
          </Form.Item>

          <Form.Item<MarketerEditProfileType>
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
              {marketerProfileEditMutation.isPending ? (
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

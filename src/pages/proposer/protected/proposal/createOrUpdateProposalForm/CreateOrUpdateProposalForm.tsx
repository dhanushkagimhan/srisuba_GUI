import { Alert, Button, Form, Input, Radio, Select, Switch } from "antd";
import { ProposerData, useProposerStore } from "../../../../../states";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ProposerFoodPreferenceEnum,
  ProposerProposalType,
  ProposerStatusEnum,
} from "../../../../../utility/typesAndEnum";
import { countries } from "../../../../../utility/const";
import {
  useProposerGetMyProposal,
  useProposerProposalCreateOrUpdate,
} from "../../../../../services/proposer";
import {
  getMutationError,
  removeNullFields,
} from "../../../../../utility/Methods";
import { SyncOutlined } from "@ant-design/icons";

const { TextArea } = Input;

type CreateOrUpdateProposalFormTextType = {
  heading: string;
  buttonText: string;
};

export default function CreateOrUpdateProposalForm() {
  const navigate = useNavigate();
  const proposerProposalCreateOrUpdateMutation =
    useProposerProposalCreateOrUpdate();
  const proposerState = useProposerStore();
  const [form] = Form.useForm();
  const proposerGetMyProposalQuery = useProposerGetMyProposal();
  const [formText, setFormText] = useState<CreateOrUpdateProposalFormTextType>({
    heading: "Proposal Creation",
    buttonText: "Create",
  });

  useEffect(() => {
    setFormData();
  }, [proposerGetMyProposalQuery.isSuccess]);

  const setFormData = () => {
    if (proposerState.data?.status === ProposerStatusEnum.EmailVerified) {
      form.setFieldsValue({
        foodPreference: ProposerFoodPreferenceEnum.NonVegetarian,
      });
    } else {
      setFormText({
        heading: "Update Proposal",
        buttonText: "Update",
      });
      if (proposerGetMyProposalQuery.isSuccess) {
        if (proposerGetMyProposalQuery.data.data.success) {
          form.setFieldsValue(proposerGetMyProposalQuery.data.data.data);
        }
      }
    }
  };

  const onSubmit = (formValues: ProposerProposalType) => {
    const proposalData: ProposerProposalType = {
      ...removeNullFields<ProposerProposalType>(formValues),
      profilePhoto:
        "https://cdn.siasat.com/wp-content/uploads/2022/05/srk-5.jpg",
    };

    proposerProposalCreateOrUpdateMutation.mutate(proposalData, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerData: ProposerData = data.data.data;
          proposerState.setData(proposerData);
          if (proposerData.status !== ProposerStatusEnum.Active) {
            navigate("/proposer-status");
          }
        }
      },
    });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">{formText.heading}</h2>
        <div>
          {proposerProposalCreateOrUpdateMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(
                  proposerProposalCreateOrUpdateMutation,
                )}
                type="error"
              />
            </div>
          ) : (
            <></>
          )}
          {proposerProposalCreateOrUpdateMutation.isSuccess ? (
            <div className="mb-4">
              <Alert
                message={"Successfully updated proposal!"}
                type="success"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Form
          name="proposalCreateOrUpdateForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
          form={form}
        >
          <Form.Item<ProposerProposalType> name="bioTitle" label="Title">
            <Input placeholder="Title" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="bioDescription"
            label="Description"
          >
            <TextArea
              rows={3}
              placeholder="Description"
              showCount
              maxLength={250}
              className="py-2"
            />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="whatsAppNumber"
            label="WhatsApp Number (Phone Number)"
            rules={[
              { required: true, message: "Please input your WhatsApp number" },
            ]}
          >
            <Input type="tel" placeholder="WhatsApp number" className="py-2" />
          </Form.Item>

          <h3 className="text-xl font-semibold">Basic</h3>

          <Form.Item<ProposerProposalType>
            name="ethnicity"
            label="Ethnicity"
            rules={[{ required: true, message: "Please input your ethnicity" }]}
          >
            <Input placeholder="Ethnicity" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="religion"
            label="Religion"
            rules={[{ required: true, message: "Please input your religion" }]}
          >
            <Input placeholder="Religion" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType> name="caste" label="Caste">
            <Input placeholder="Caste" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="civilStatus"
            label="Civil Status"
            tooltip="Your civil status. example : If you never married before, add here as 'never married'. Or else, add your previous marriage status information here."
            rules={[{ required: true, message: "Please input your religion" }]}
          >
            <Input placeholder="Civil Status" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="height"
            label="Height"
            rules={[{ required: true, message: "Please input your height" }]}
          >
            <Input placeholder="Height" className="py-2" />
          </Form.Item>

          <h3 className="text-xl font-semibold">Residency</h3>

          <Form.Item<ProposerProposalType>
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

          <Form.Item<ProposerProposalType>
            name="stateOrDistrict"
            label="State / District"
            rules={[
              { required: true, message: "Please input your state / district" },
            ]}
          >
            <Input placeholder="State / District" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="city"
            label="City"
            rules={[{ required: true, message: "Please input your city" }]}
          >
            <Input placeholder="City" className="py-2" />
          </Form.Item>

          <h3 className="text-xl font-semibold">Education and Profession</h3>

          <Form.Item<ProposerProposalType>
            name="education"
            label="Education"
            rules={[
              {
                required: true,
                message: "Please input your education details",
              },
            ]}
          >
            <Input placeholder="Education details" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="profession"
            label="Profession"
            rules={[
              {
                required: true,
                message: "Please input your profession",
              },
            ]}
          >
            <Input placeholder="Profession" className="py-2" />
          </Form.Item>

          <h3 className="text-xl font-semibold">Habits</h3>

          <Form.Item<ProposerProposalType>
            name="drinking"
            label="Drinking"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="smoking"
            label="Smoking"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="foodPreference"
            label="Food Preference"
          >
            <Radio.Group>
              <Radio value={ProposerFoodPreferenceEnum.NonVegetarian}>
                non vegetarian
              </Radio>
              <Radio value={ProposerFoodPreferenceEnum.Vegetarian}>
                vegetarian
              </Radio>
              <Radio value={ProposerFoodPreferenceEnum.Vegan}>vegan</Radio>
            </Radio.Group>
          </Form.Item>

          <h3 className="text-xl font-semibold">Family Information</h3>

          <Form.Item<ProposerProposalType>
            name="fatherEthnicity"
            label="Father's Ethnicity"
            rules={[
              {
                required: true,
                message: "Please input your father's ethnicity",
              },
            ]}
          >
            <Input placeholder="Father's ethnicity" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="fatherReligion"
            label="Father's Religion"
            rules={[
              {
                required: true,
                message: "Please input your father's religion",
              },
            ]}
          >
            <Input placeholder="Father's religion" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="fatherCaste"
            label="Father's Caste"
          >
            <Input placeholder="Father's caste" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="fatherProfession"
            label="Father's Profession"
          >
            <Input placeholder="Father's profession" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="fatherCountryOfResidence"
            label="Father's Country of Residence"
            rules={[
              {
                required: true,
                message: "Please select your father's country cf residence",
              },
            ]}
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

          <Form.Item<ProposerProposalType>
            name="fatherAdditionalInfo"
            label="Father's Additional Information"
          >
            <Input
              placeholder="Father's additional information"
              className="py-2"
            />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="motherEthnicity"
            label="Mother's Ethnicity"
            rules={[
              {
                required: true,
                message: "Please input your mother's ethnicity",
              },
            ]}
          >
            <Input placeholder="Mother's ethnicity" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="motherReligion"
            label="Mother's Religion"
            rules={[
              {
                required: true,
                message: "Please input your mother's religion",
              },
            ]}
          >
            <Input placeholder="Mother's religion" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="motherCaste"
            label="Mother's Caste"
          >
            <Input placeholder="Mother's caste" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="motherProfession"
            label="Mother's Profession"
          >
            <Input placeholder="Mother's profession" className="py-2" />
          </Form.Item>

          <Form.Item<ProposerProposalType>
            name="motherCountryOfResidence"
            label="Mother's Country of Residence"
            rules={[
              {
                required: true,
                message: "Please select your mother's country cf residence",
              },
            ]}
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

          <Form.Item<ProposerProposalType>
            name="motherAdditionalInfo"
            label="Mother's Additional Information"
          >
            <Input
              placeholder="Mother's additional information"
              className="py-2"
            />
          </Form.Item>

          <h3 className="text-xl font-semibold">Horoscope Information</h3>

          <Form.Item<ProposerProposalType>
            name="horoscopeMatching"
            label="Horoscope Matching"
            valuePropName="checked"
          >
            <Switch checkedChildren="Required" unCheckedChildren="No" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {proposerProposalCreateOrUpdateMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )}
              {formText.buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

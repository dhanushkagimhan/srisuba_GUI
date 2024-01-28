import {
  Alert,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Switch,
  Image,
  Upload,
} from "antd";
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
  resizeImageFile,
} from "../../../../../utility/Methods";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const { TextArea } = Input;

type CreateOrUpdateProposalFormTextType = {
  heading: string;
  buttonText: string;
};

const client = new S3Client({
  region: import.meta.env.VITE_S3_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY,
  },
});

export default function CreateOrUpdateProposalForm() {
  const navigate = useNavigate();
  const proposerProposalCreateOrUpdateMutation =
    useProposerProposalCreateOrUpdate();
  const proposerState = useProposerStore();
  const [form] = Form.useForm();
  const proposerGetMyProposalQuery = useProposerGetMyProposal();
  const [formText, setFormText] = useState<CreateOrUpdateProposalFormTextType>({
    heading: "Personal Information",
    buttonText: "Next",
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState<File>();
  const [profilePhotokey, setProfilePhotoKey] = useState<string>();
  const [s3EventLoading, setS3EventLoading] = useState<boolean>(false);

  const [profilePhotoRequiredErrorShow, setProfilePhotoRequiredErrorShow] =
    useState<boolean>(false);

  useEffect(() => {
    setFormData();
  }, [proposerGetMyProposalQuery.data]);

  const setFormData = () => {
    if (proposerState.data?.status === ProposerStatusEnum.EmailVerified) {
      form.setFieldsValue({
        foodPreference: ProposerFoodPreferenceEnum.NonVegetarian,
        drinking: false,
        smoking: false,
        horoscopeMatching: false,
      });
    } else {
      setFormText({
        heading: "Update Personal Information",
        buttonText: "Update",
      });
      if (proposerGetMyProposalQuery.isSuccess) {
        if (proposerGetMyProposalQuery.data.data.success) {
          setProfilePhotoKey(
            proposerGetMyProposalQuery.data.data.data.profilePhoto,
          );
          form.setFieldsValue({ ...proposerGetMyProposalQuery.data.data.data });
        }
      }
    }
  };

  const onSubmit = (formValues: ProposerProposalType) => {
    const proposalData: ProposerProposalType = {
      ...removeNullFields<ProposerProposalType>(formValues),
    };

    if (proposerState.data?.status === ProposerStatusEnum.EmailVerified) {
      setS3EventLoading(true);
      uploadImageToS3(proposalData);
    } else {
      if (profilePhotoFile == null) {
        if (profilePhotokey != null) {
          proposalData.profilePhoto = profilePhotokey;
          submitFormData(proposalData);
        }
      } else {
        setS3EventLoading(true);
        deleteImageFromS3(proposalData);
      }
    }
  };

  const submitFormData = (formData: ProposerProposalType) => {
    proposerProposalCreateOrUpdateMutation.mutate(formData, {
      onSuccess: (data) => {
        if (data.data.success) {
          const proposerPreviousData: ProposerData | undefined =
            proposerState.data;

          if (proposerPreviousData != null) {
            proposerPreviousData.status = data.data.data.status;
            proposerState.setData(proposerPreviousData);

            if (proposerPreviousData.status === ProposerStatusEnum.Active) {
              proposerGetMyProposalQuery.refetch();
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
              navigate("/proposer-status");
            }
          }
        }
      },
      onError: () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      },
    });
  };

  const uploadImageToS3 = async (formData: ProposerProposalType) => {
    if (profilePhotoFile != null) {
      const profileImage = await resizeImageFile(profilePhotoFile);

      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        Key: `${proposerState.data?.id}-${profilePhotoFile?.name}`,
        ContentType: "image/jpeg",
        Body: profileImage,
      });

      try {
        await client.send(command);

        const profilePhotoKey: string = `${proposerState.data?.id}-${profilePhotoFile?.name}`;

        setProfilePhotoKey(profilePhotoKey);

        const formDataWithProfilePicture: ProposerProposalType = {
          ...formData,
          profilePhoto: profilePhotoKey,
        };

        setS3EventLoading(false);

        submitFormData(formDataWithProfilePicture);
      } catch (err) {
        console.error("upload Error : ", err);
      }
    } else {
      setProfilePhotoRequiredErrorShow(true);
      setS3EventLoading(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const deleteImageFromS3 = async (formData: ProposerProposalType) => {
    const command = new DeleteObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: profilePhotokey,
    });

    try {
      await client.send(command);

      uploadImageToS3(formData);
    } catch (err) {
      console.error("delete Error : ", err);
    }
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

        {profilePhotokey ? (
          <div className="my-2">
            <div>
              <Image
                className="max-w-[300px] max-h-[300px]"
                src={`${
                  import.meta.env.VITE_S3_IMAGES_BASE_URL
                }${profilePhotokey}`}
              ></Image>
            </div>
            <div className="italic">
              ( If you change the profile picture, you need to upload photo and
              submit the form for change your profile picture )
            </div>
          </div>
        ) : (
          <></>
        )}

        <Form
          name="proposalCreateOrUpdateForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
          form={form}
        >
          <Form.Item<ProposerProposalType> label="Profile Photo">
            <Upload
              listType="picture-card"
              maxCount={1}
              accept="image/png, image/jpeg"
              onRemove={() => setProfilePhotoFile(undefined)}
              beforeUpload={(file) => {
                setProfilePhotoFile(file);
                return false;
              }}
              onPreview={() => {}}
            >
              <div>
                <PlusOutlined />
                <div className="mt-2">Upload</div>
              </div>
            </Upload>
            {profilePhotoRequiredErrorShow && profilePhotoFile == null ? (
              <div className="text-red-600">Upload the profile photo</div>
            ) : (
              <></>
            )}
          </Form.Item>

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
              {s3EventLoading ||
              proposerProposalCreateOrUpdateMutation.isPending ? (
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

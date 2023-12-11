import { Button, Form, Input, Select } from "antd";
import { useMainLayoutStore } from "../../../../states";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ProposerProposalType } from "../../../../utility/types";
import { countries } from "../../../../utility/const";

const { Option } = Select;
const { TextArea } = Input;

export default function CreateOrUpdateProposal() {
  const mainLayoutState = useMainLayoutStore();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (formValues: ProposerProposalType) => {
    console.log(formValues);

    // proposerRegisterMutation.mutate(formValues, {
    //   onSuccess: (data) => {
    //     if (data.data.success) {
    //       const proposerData: ProposerData = data.data.data;
    //       proposerState.setData(proposerData);
    //       navigate("/proposer-email-verify");
    //     }
    //   },
    // });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">{"Proposal Creation"}</h2>
        <div>
          {/* {proposerRegisterMutation.isError ? (
            <div className="mb-4">
              <Alert
                message={getMutationError(proposerRegisterMutation)}
                type="error"
              />
            </div>
          ) : (
            <></>
          )} */}
        </div>
        <Form
          name="proposalCreateOrUpdateForm"
          onFinish={onSubmit}
          layout="vertical"
          className="flex flex-col gap-2"
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

          {/* <Form.Item<ProposerRegisterType>
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value={Gender.Male}>Male</Option>
              <Option value={Gender.Female}>Female</Option>
            </Select>
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {/* {proposerRegisterMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )} */}
              {"Create"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

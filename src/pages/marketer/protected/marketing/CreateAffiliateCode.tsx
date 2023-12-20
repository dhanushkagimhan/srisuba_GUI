import { useNavigate } from "react-router-dom";
import { useMainLayoutStore, useMarketerStore } from "../../../../states";
import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import {
  MainLayoutNavEnum,
  MarketerCreateAffiliateCodeType,
} from "../../../../utility/typesAndEnum";

export default function CreateAffiliateCode() {
  const mainLayoutState = useMainLayoutStore();
  const marketerState = useMarketerStore();
  //   const marketerEmailVerifyMutation = useMarketerEmailVerify();
  const navigate = useNavigate();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.marketerLogout,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  const onSubmit = (values: MarketerCreateAffiliateCodeType) => {
    // const emailVerifyData: MarketerEmailVerifyType = {
    //   email: marketerState.data?.email,
    //   code: values.code,
    // };
    // marketerEmailVerifyMutation.mutate(emailVerifyData, {
    //   onSuccess: (data) => {
    //     if (data.data.success) {
    //       const marketerData: MarketerData = data.data.data;
    //       marketerState.setData(marketerData);
    //       setCookie("marketerJwt", marketerData.accessToken, {
    //         expires: dayjs().add(1, "h").toDate(),
    //       });
    //       navigate("#");
    //       console.log("yehhhhhhh");
    //     }
    //   },
    // });
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h2 className="text-2xl font-semibold">Create your Affiliate Code</h2>
        <p>
          This is the referral code of you.{" "}
          <span className="font-medium">
            After created this code you never can change this code.
          </span>{" "}
          Therefore carefully choose your code.
        </p>
        {/* <div>
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
        </div> */}
        <Form
          name="marketerAffiliateCodeCreateForm"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-2"
        >
          <Form.Item<MarketerCreateAffiliateCodeType>
            name="code"
            label="New Affiliate Code"
            rules={[
              { required: true, message: "Please input new affiliate code" },
              {
                min: 2,
                message: "Affiliate code must have at least 2 characters",
              },
            ]}
          >
            <Input placeholder="Your new affiliate code" className="py-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full pb-10 text-2xl font-medium"
            >
              {/* {marketerEmailVerifyMutation.isPending ? (
                <span className="text-lg mr-2">
                  <SyncOutlined spin />
                </span>
              ) : (
                <></>
              )} */}
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

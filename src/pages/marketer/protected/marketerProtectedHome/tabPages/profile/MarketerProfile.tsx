import { Tabs } from "antd";
import { MarketerEditProfile } from "./tabPages";

export default function MarketerProfile() {
  return (
    <div className="flex flex-row justify-center">
      <div className="xl:w-4/5 w-full">
        <Tabs
          destroyInactiveTabPane={true}
          type="card"
          items={[
            {
              label: <span className="font-semibold">Edit Profile</span>,
              key: "editProfile",
              children: <MarketerEditProfile />,
            },
            {
              label: <span className="font-semibold">Bank Account</span>,
              key: "bankAccount",
              children: "Bank Account",
            },
            {
              label: <span className="font-semibold">Change Password</span>,
              key: "changePassword",
              children: "change password",
            },
          ]}
        />
      </div>
    </div>
  );
}

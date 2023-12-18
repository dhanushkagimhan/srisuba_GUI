import { Tabs } from "antd";
import { ProposerChangePassword, ProposerEditProfile } from "./tabPages";
import CreateOrUpdateProposalForm from "../../../proposal/createOrUpdateProposalForm/CreateOrUpdateProposalForm";

export default function ProposerProfile() {
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
              children: <ProposerEditProfile />,
            },
            {
              label: <span className="font-semibold">Edit Proposal</span>,
              key: "editProposal",
              children: <CreateOrUpdateProposalForm />,
            },
            {
              label: <span className="font-semibold">Change Password</span>,
              key: "changePassword",
              children: <ProposerChangePassword />,
            },
          ]}
        />
      </div>
    </div>
  );
}

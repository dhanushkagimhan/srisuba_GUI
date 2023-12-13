import { Tabs } from "antd";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../../states";
import { ProposerProposals } from "./tabPages";

export default function ProposerHome() {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.proposerLogout,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  return (
    <div className="w-full">
      <Tabs
        type="card"
        items={[
          {
            label: <span className="font-semibold">Proposals</span>,
            key: "proposal",
            children: <ProposerProposals />,
          },
          {
            label: <span className="font-semibold">Partners</span>,
            key: "partners",
            children: `Partners`,
          },
          {
            label: <span className="font-semibold">Requested</span>,
            key: "requested",
            children: `Requested`,
          },
          {
            label: <span className="font-semibold">Received</span>,
            key: "received",
            children: `Received`,
          },
          {
            label: <span className="font-semibold">Rejected</span>,
            key: "rejected",
            children: `Rejected`,
          },
          {
            label: <span className="font-semibold">Profile</span>,
            key: "profile",
            children: `Profile`,
          },
        ]}
      />
    </div>
  );
}

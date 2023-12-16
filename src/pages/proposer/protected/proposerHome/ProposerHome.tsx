import { Tabs } from "antd";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../../states";
import {
  MatchedProposals,
  ProposerProposals,
  ProposerProposedProposals,
  ProposerRejectedProposals,
  ReceivedProposals,
} from "./tabPages";

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
        destroyInactiveTabPane={true}
        items={[
          {
            label: <span className="font-semibold">Proposals</span>,
            key: "proposal",
            children: <ProposerProposals />,
          },
          {
            label: <span className="font-semibold">Matched Proposals</span>,
            key: "matchedProposals",
            children: <MatchedProposals />,
          },
          {
            label: <span className="font-semibold">Received</span>,
            key: "received",
            children: <ReceivedProposals />,
          },
          {
            label: <span className="font-semibold">Proposed</span>,
            key: "proposed",
            children: <ProposerProposedProposals />,
          },
          {
            label: <span className="font-semibold">Rejected</span>,
            key: "rejected",
            children: <ProposerRejectedProposals />,
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

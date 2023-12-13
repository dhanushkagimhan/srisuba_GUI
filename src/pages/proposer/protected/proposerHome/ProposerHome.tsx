import { Tabs } from "antd";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../../states";

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
            label: `Proposals`,
            key: "proposal",
            children: `proposals`,
          },
          {
            label: `Partners`,
            key: "partners",
            children: `Partners`,
          },
          {
            label: `Requested`,
            key: "requested",
            children: `Requested`,
          },
          {
            label: `Received`,
            key: "received",
            children: `Received`,
          },
          {
            label: `Rejected`,
            key: "rejected",
            children: `Rejected`,
          },
          {
            label: "Profile",
            key: "profile",
            children: `Profile`,
          },
        ]}
      />
    </div>
  );
}

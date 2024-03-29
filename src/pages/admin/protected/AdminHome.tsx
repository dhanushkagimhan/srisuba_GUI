import { Tabs } from "antd";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../states";
import { AdminMarketerView, AdminProposersView, AdminSystem } from "./tabPages";

export default function AdminHome() {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.adminLogout,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  return (
    <div className="w-full">
      <Tabs
        type="line"
        destroyInactiveTabPane={true}
        items={[
          {
            label: <span className="font-semibold">Proposers</span>,
            key: "proposers",
            children: <AdminProposersView />,
          },
          {
            label: <span className="font-semibold">Marketers</span>,
            key: "marketers",
            children: <AdminMarketerView />,
          },
          {
            label: <span className="font-semibold">System</span>,
            key: "system",
            children: <AdminSystem />,
          },
        ]}
      />
    </div>
  );
}

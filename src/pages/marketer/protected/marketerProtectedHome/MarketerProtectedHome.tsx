import { Tabs } from "antd";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../../utility/typesAndEnum";
import { useMainLayoutStore } from "../../../../states";
import { Home, MarketerProfile, MarketerWithdrawals } from "./tabPages";

export default function MarketerProtectedHome() {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.marketerLogout,
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
            label: <span className="font-semibold">Home</span>,
            key: "home",
            children: <Home />,
          },
          {
            label: <span className="font-semibold">Withdrawals</span>,
            key: "withdrawals",
            children: <MarketerWithdrawals />,
          },
          {
            label: <span className="font-semibold">Profile</span>,
            key: "profile",
            children: <MarketerProfile />,
          },
        ]}
      />
    </div>
  );
}

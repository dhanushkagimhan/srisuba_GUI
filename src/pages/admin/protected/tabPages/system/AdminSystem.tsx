import { Tabs } from "antd";
import {
  AdminChangeProposalPrice,
  AdminSystemDashboard,
  AdminSystemWithdrawals,
} from "./tabPages";

export default function AdminSystem() {
  return (
    <div className="flex flex-row justify-center">
      <div className="xl:w-4/5 w-full">
        <Tabs
          destroyInactiveTabPane={true}
          type="card"
          items={[
            {
              label: <span className="font-semibold">Dashboard</span>,
              key: "dashboard",
              children: <AdminSystemDashboard />,
            },
            {
              label: <span className="font-semibold">Withdrawals</span>,
              key: "withdrawals",
              children: <AdminSystemWithdrawals />,
            },
            {
              label: (
                <span className="font-semibold">Change Proposal Price</span>
              ),
              key: "changeProposalPrice",
              children: <AdminChangeProposalPrice />,
            },
          ]}
        />
      </div>
    </div>
  );
}

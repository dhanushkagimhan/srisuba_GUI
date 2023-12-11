import { useEffect } from "react";
import { useMainLayoutStore, useProposalPriceStore } from "../../../../states";
import { BankAccount } from "../../../../utility/components";
import { systemContactNumber } from "../../../../utility/const";

export default function MembershipExpired() {
  const mainLayoutState = useMainLayoutStore();
  const proposalPriceState = useProposalPriceStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: undefined,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="md:w-3/5 w-full">
        <h1 className="sm:text-5xl text-2xl">
          Your account membership is expired!
        </h1>
        <p>You need to renew your membership. for that,</p>
        <div className="mt-4">
          Membership payment : Rs. {proposalPriceState.price ?? ""} (LKR) per 3
          months
        </div>
        <div className="mt-4">
          Transfer the Rs. {proposalPriceState.price ?? ""} (LKR) to following
          bank account and send the slip / screenshot and you email to the{" "}
          {systemContactNumber} via whatsApp.
        </div>
        <BankAccount />
      </div>
    </div>
  );
}

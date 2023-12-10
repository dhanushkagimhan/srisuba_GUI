import { useEffect } from "react";
import { useMainLayoutStore } from "../../../../states";

export default function MembershipExpired() {
  const mainLayoutState = useMainLayoutStore();

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
        <p>You need renew it.</p>
        {/* Here need to add system bank account details with using reusable component */}
      </div>
    </div>
  );
}

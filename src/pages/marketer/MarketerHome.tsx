import { useEffect } from "react";
import { useMainLayoutStore, useProposalPriceStore } from "../../states";
import { MainLayoutNavEnum } from "../../utility/typesAndEnum";
import MarketerLogin from "./open/MarketerLogin";

export default function MarketerHome() {
  const mainLayoutState = useMainLayoutStore();
  const proposalPriceState = useProposalPriceStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.marketerRegister,
      showFooter: false,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  return (
    <div className="flex md:flex-row flex-col md:justify-between">
      <div className="w-full md:pt-20 lg:pl-20 md:pr-10">
        <h1 className="md:text-6xl text-3xl text-neutral-900">
          Earn with Srisuba
        </h1>
        <p className="text-neutral-900 md:-mt-5 md:text-xl font-medium">
          You can become a affiliate marketer with Srisuba.
        </p>
        <p className="text-neutral-900 md:text-xl font-medium">
          You can earn{" "}
          <span className="bg-yellow-200">
            Rs. {proposalPriceState.price ? proposalPriceState.price / 10 : ""}{" "}
            (LKR)
          </span>{" "}
          for the every proposal suggestion.
        </p>
      </div>
      <div className="w-full md:pt-20 pt-10 xl:pl-40">
        <MarketerLogin />
      </div>
    </div>
  );
}

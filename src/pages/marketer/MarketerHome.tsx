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
      showFooter: true,
      showMarketing: false,
      logoLink: "/",
    });
  }, []);

  return (
    <div>
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
              Rs.{" "}
              {proposalPriceState.price ? proposalPriceState.price / 10 : ""}{" "}
              (LKR)
            </span>{" "}
            for the every proposal suggestion.
          </p>
        </div>
        <div className="w-full md:pt-20 pt-10 xl:pl-40">
          <MarketerLogin />
        </div>
      </div>

      <div className="flex flex-row justify-center mt-10">
        <div>
          <p className="font-semibold">
            Learn more about srisuba.com Affiliate marketing program
          </p>
          <iframe
            className="sm:w-[560px] sm:h-[315px] w-[255px] h-[144px]"
            src="https://www.youtube-nocookie.com/embed/0rLOzvDAz6Y?si=D0Xmm5h6IgoJp-ow"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

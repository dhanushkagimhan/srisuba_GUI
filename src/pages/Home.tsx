import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import dayjs from "dayjs";
import { ProposerLogin } from "./proposer";
import { useMainLayOutStore } from "../states";
import { MainLayoutNavEnum } from "../utility/types";

export default function Home() {
  const [_, setCookie] = useCookies(["ref"]);
  const [searchParams] = useSearchParams();

  const mainLayoutState = useMainLayOutStore();

  useEffect(() => {
    if (searchParams.get("r") != null) {
      setCookie("ref", searchParams.get("r"), {
        expires: dayjs().add(20, "day").toDate(),
      });
    }

    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.postProposer,
      showFooter: true,
      showMarketing: true,
    });
  }, []);

  return (
    <div className="flex flex-row max-md:flex-col md:justify-between h-[70vh]">
      <div className="w-full md:pt-20 lg:pl-20">
        <h1 className="text-6xl text-neutral-900">Srisuba</h1>
        <p className="text-neutral-900 -mt-5 text-xl font-medium">
          The matrimonial proposal service
        </p>
      </div>
      <div className="w-full pt-20 xl:pl-40">
        <ProposerLogin />
      </div>
    </div>
  );
}

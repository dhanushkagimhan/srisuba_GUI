import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import dayjs from "dayjs";
import { ProposerLogin } from "./proposer";
import { useMainLayoutStore, useProposalPriceStore } from "../states";
import { MainLayoutNavEnum } from "../utility/typesAndEnum";
import { useProposalPrice } from "../services/common";
import { List } from "antd";
import { FaFeatherPointed } from "react-icons/fa6";

export default function Home() {
  const [_, setCookie] = useCookies(["ref"]);
  const [searchParams] = useSearchParams();
  const mainLayoutState = useMainLayoutStore();
  const proposalPriceQuery = useProposalPrice();
  const proposalPriceState = useProposalPriceStore();

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
      logoLink: "/",
    });

    setProposalPrice();
  }, [proposalPriceQuery.data]);

  const setProposalPrice = () => {
    if (proposalPriceQuery.isSuccess) {
      if (proposalPriceQuery.data.data.success) {
        proposalPriceState.setPrice(proposalPriceQuery.data.data.data.price);
      }
    }
  };

  const featureList = [
    {
      title: "Good privacy and security for your proposal.",
      description:
        "Only Registered and login members can view the marriage proposals. And contact details only show between the matched proposals.",
    },
    {
      title: "You can view and propose to a any proposal.",
      description: "You can view and proposing to any number of proposals.",
    },
    {
      title: "Very low proposal price.",
      description: "Only Rs. 1500 (LKR) per 3-months.",
    },
  ];

  return (
    <div>
      <div className="flex flex-row max-md:flex-col md:justify-between">
        <div className="w-full md:pt-20 lg:pl-20">
          <h1 className="text-6xl text-neutral-900">Srisuba</h1>
          <p className="text-neutral-900 -mt-5 text-xl font-medium">
            The matrimonial proposal service
          </p>
        </div>
        <div className="w-full md:pt-20 pt-10 xl:pl-40">
          <ProposerLogin />
        </div>
      </div>

      <div className="mt-20">
        <h2 className="max-md:text-lg">
          srisuba.com is a marriage proposal posting service.
        </h2>
        <p className="font-medium">
          You can find your dream partner very easily with srisuba.com
        </p>
      </div>

      <div className="md:pl-10">
        <List
          itemLayout="horizontal"
          dataSource={featureList}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                key={index}
                avatar={<FaFeatherPointed />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>

      <div className="flex flex-row justify-center mt-10">
        <div>
          <p className="font-semibold">Learn more about srisuba.com</p>
          <iframe
            className="sm:w-[560px] sm:h-[315px] w-[255px] h-[144px]"
            src="https://www.youtube-nocookie.com/embed/2CH50VgqJrM?si=FiRxwnqgYuQ4-lev"
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

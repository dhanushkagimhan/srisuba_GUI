import { useMainLayoutStore } from "../../../../states";
import { useEffect } from "react";
import { MainLayoutNavEnum } from "../../../../utility/typesAndEnum";
import CreateOrUpdateProposalForm from "./createOrUpdateProposalForm/CreateOrUpdateProposalForm";

export default function CreateOrUpdateProposal() {
  const mainLayoutState = useMainLayoutStore();

  useEffect(() => {
    mainLayoutState.setData({
      navMenu: MainLayoutNavEnum.proposerLogout,
      showFooter: false,
      showMarketing: false,
      logoLink: "#",
    });
  }, []);

  return <CreateOrUpdateProposalForm />;
}

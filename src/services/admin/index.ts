import {
  useAdminLoginVerify,
  useAdminLogin,
} from "./authentication/authentication";
import {
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
  useAdminGetProposal,
  useAdminGetProposals,
} from "./proposal/proposal";

export {
  useAdminLogin,
  useAdminLoginVerify,
  useAdminGetProposals,
  useAdminGetProposal,
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
};

import {
  useAdminLoginVerify,
  useAdminLogin,
} from "./authentication/authentication";
import {
  useAdminGetMarketerReferredProposers,
  useAdminGetMarketers,
} from "./marketer/marketer";
import {
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
  useAdminGetProposal,
  useAdminGetProposals,
  useAdminRenewProposerMembership,
} from "./proposal/proposal";

export {
  useAdminLogin,
  useAdminLoginVerify,
  useAdminGetProposals,
  useAdminGetProposal,
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
  useAdminRenewProposerMembership,
  useAdminGetMarketers,
  useAdminGetMarketerReferredProposers,
};

import {
  useAdminLoginVerify,
  useAdminLogin,
} from "./authentication/authentication";
import {
  useAdminGetMarketerBankAccount,
  useAdminGetMarketerReferredProposers,
  useAdminGetMarketerWithdrawals,
  useAdminGetMarketers,
  useAdminWithdrawMarketerIncome,
} from "./marketer/marketer";
import {
  useAdminApproveProposerPayment,
  useAdminChangeProposerStatus,
  useAdminGetProposal,
  useAdminGetProposals,
  useAdminRenewProposerMembership,
} from "./proposal/proposal";
import {
  useAdminGetSystemDetails,
  useAdminGetSystemWithdrawals,
  useAdminWithdrawSystemIncome,
} from "./system/system";

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
  useAdminGetMarketerWithdrawals,
  useAdminGetMarketerBankAccount,
  useAdminWithdrawMarketerIncome,
  useAdminGetSystemDetails,
  useAdminWithdrawSystemIncome,
  useAdminGetSystemWithdrawals,
};

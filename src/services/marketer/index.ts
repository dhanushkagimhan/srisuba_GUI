import {
  useMarketerEmailVerify,
  useMarketerForgotPassword,
  useMarketerLogin,
  useMarketerRegenEmailVerify,
  useMarketerRegister,
  useMarketerResetPassword,
} from "./authentication/authentication";
import {
  useMarketerGetAccountBalance,
  useMarketerGetWithdrawals,
} from "./earnings/earnings";
import {
  useMarketerCreateAffiliateCode,
  useMarketerGetAffiliatedProposers,
} from "./marketing/marketing";
import { useMarketerProfileEdit } from "./profile/profile";

export {
  useMarketerLogin,
  useMarketerRegister,
  useMarketerEmailVerify,
  useMarketerRegenEmailVerify,
  useMarketerForgotPassword,
  useMarketerResetPassword,
  useMarketerCreateAffiliateCode,
  useMarketerGetAccountBalance,
  useMarketerGetAffiliatedProposers,
  useMarketerGetWithdrawals,
  useMarketerProfileEdit,
};

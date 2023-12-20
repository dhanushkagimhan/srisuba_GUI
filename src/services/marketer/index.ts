import {
  useMarketerEmailVerify,
  useMarketerForgotPassword,
  useMarketerLogin,
  useMarketerRegenEmailVerify,
  useMarketerRegister,
  useMarketerResetPassword,
} from "./authentication/authentication";
import { useMarketerGetAccountBalance } from "./earnings/earnings";
import {
  useMarketerCreateAffiliateCode,
  useMarketerGetAffiliatedProposers,
} from "./marketing/marketing";

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
};

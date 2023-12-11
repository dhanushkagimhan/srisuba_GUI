import {
  useProposerEmailVerify,
  useProposerForgotPassword,
  useProposerLogin,
  useProposerRegenEmailVerify,
  useProposerRegister,
  useProposerResetPassword,
} from "./authentication/authentication";
import { useProposerProposalCreateOrUpdate } from "./proposal/proposal";

export {
  useProposerLogin,
  useProposerRegister,
  useProposerEmailVerify,
  useProposerRegenEmailVerify,
  useProposerForgotPassword,
  useProposerResetPassword,
  useProposerProposalCreateOrUpdate,
};

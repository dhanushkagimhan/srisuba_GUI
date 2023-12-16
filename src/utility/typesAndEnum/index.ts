import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  ProposerStatusEnum,
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
  ProposerForgotPasswordType,
  ProposerResetPasswordType,
  ProposerProposalType,
  ProposerFoodPreferenceEnum,
  ProposerOtherProposerType,
  ProposerOtherProposalType,
  ProposerMatchingProposalStatusEnum,
  ProposerProposeType,
  ProposerMatchedProposerType,
  ProposerReceivedProposerType,
  ProposerProposalAcceptationType,
  ProposerProposedProposerType,
  ProposerRejectedProposerType,
} from "./proposer/proposer";

enum GenderEnum {
  Male = "Male",
  Female = "Female",
}

export type {
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
  ProposerForgotPasswordType,
  ProposerResetPasswordType,
  ProposerProposalType,
  ProposerOtherProposerType,
  ProposerOtherProposalType,
  ProposerProposeType,
  ProposerMatchedProposerType,
  ProposerReceivedProposerType,
  ProposerProposalAcceptationType,
  ProposerProposedProposerType,
  ProposerRejectedProposerType,
};

export {
  MainLayoutNavEnum,
  GenderEnum,
  ProposerStatusEnum,
  ProposerFoodPreferenceEnum,
  ProposerMatchingProposalStatusEnum,
};

import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  MarketerEmailVerifyType,
  MarketerForgotPasswordType,
  MarketerLoginType,
  MarketerRegenEmailVerifyType,
  MarketerRegisterType,
  MarketerResetPasswordType,
  MarketerStatusEnum,
} from "./marketer/marketer";
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
  ProposerEditProfileType,
  ProposerEditProfileResponseType,
  ProposerChangePasswordType,
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
  ProposerEditProfileType,
  ProposerEditProfileResponseType,
  ProposerChangePasswordType,
  MarketerLoginType,
  MarketerRegisterType,
  MarketerEmailVerifyType,
  MarketerRegenEmailVerifyType,
  MarketerForgotPasswordType,
  MarketerResetPasswordType,
};

export {
  MainLayoutNavEnum,
  GenderEnum,
  ProposerStatusEnum,
  ProposerFoodPreferenceEnum,
  ProposerMatchingProposalStatusEnum,
  MarketerStatusEnum,
};

import { AdminLoginType } from "./admin/admin";
import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  MarketerAffiliatedProposerType,
  MarketerBankAccountType,
  MarketerChangePasswordType,
  MarketerCreateAffiliateCodeType,
  MarketerEditProfileType,
  MarketerEmailVerifyType,
  MarketerForgotPasswordType,
  MarketerLoginType,
  MarketerRegenEmailVerifyType,
  MarketerRegisterType,
  MarketerResetPasswordType,
  MarketerStatusEnum,
  MarketerWithdrawalType,
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

enum PaymentStatus {
  Pending = "Pending",
  Approved = "Approved",
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
  MarketerCreateAffiliateCodeType,
  MarketerAffiliatedProposerType,
  MarketerWithdrawalType,
  MarketerEditProfileType,
  MarketerBankAccountType,
  MarketerChangePasswordType,
  AdminLoginType,
};

export {
  MainLayoutNavEnum,
  GenderEnum,
  ProposerStatusEnum,
  ProposerFoodPreferenceEnum,
  ProposerMatchingProposalStatusEnum,
  MarketerStatusEnum,
  PaymentStatus,
};

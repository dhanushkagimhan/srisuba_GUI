import { GenderEnum } from "..";

enum ProposerStatusEnum {
  PendingEmailVerification = "PendingEmailVerification",
  EmailVerified = "EmailVerified",
  PendingPayment = "PendingPayment",
  PaymentApproved = "PaymentApproved",
  Active = "Active",
  Rejected = "Rejected",
  RejectionResolved = "RejectionResolved",
  Banned = "Banned",
  BannedResolved = "BannedResolved",
}

type ProposerLoginType = {
  email: string;
  password: string;
};

type ProposerRegisterType = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: GenderEnum;
  referralCode?: string;
};

type ProposerEmailVerifyType = {
  email?: string;
  code: string;
};

type ProposerRegenEmailVerifyType = {
  email?: string;
};

type ProposerForgotPasswordType = {
  email?: string;
};

type ProposerResetPasswordType = {
  email?: string;
  code: string;
  newPassword: string;
  confirmNewPassword?: string;
};

enum ProposerFoodPreferenceEnum {
  NonVegetarian = "NonVegetarian",
  Vegetarian = "Vegetarian",
  Vegan = "Vegan",
}

type ProposerProposalType = {
  profilePhoto: string;
  otherPictures?: string[];
  bioTitle?: string;
  bioDescription?: string;
  whatsAppNumber: string;
  ethnicity: string;
  religion: string;
  caste?: string;
  civilStatus: string;
  height: string;
  country: string;
  stateOrDistrict: string;
  city: string;
  education: string;
  profession: string;
  drinking: boolean;
  smoking: boolean;
  foodPreference: ProposerFoodPreferenceEnum;
  fatherEthnicity: string;
  fatherReligion: string;
  fatherCaste?: string;
  fatherProfession?: string;
  fatherCountryOfResidence: string;
  fatherAdditionalInfo?: string;
  motherEthnicity: string;
  motherReligion: string;
  motherCaste?: string;
  motherProfession?: string;
  motherCountryOfResidence: string;
  motherAdditionalInfo?: string;
  horoscopeMatching: boolean;
};

type ProposerOtherProposerType = {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  profilePhoto: string;
  city: string;
  country: string;
  ethnicity: string;
  religion: string;
  age: number;
  profession: string;
};

enum ProposerMatchingProposalStatusEnum {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
}

type ProposerOtherProposalType = {
  profilePhoto: string;
  otherPictures: string[] | null;
  bioTitle: string | null;
  bioDescription: string | null;
  whatsAppNumber?: string;
  ethnicity: string;
  religion: string;
  caste: string | null;
  civilStatus: string;
  height: string;
  country: string;
  stateOrDistrict: string;
  city: string;
  education: string;
  profession: string;
  drinking: boolean;
  smoking: boolean;
  foodPreference: ProposerFoodPreferenceEnum;
  fatherEthnicity: string;
  fatherReligion: string;
  fatherCaste: string | null;
  fatherProfession: string | null;
  fatherCountryOfResidence: string;
  fatherAdditionalInfo: string | null;
  motherEthnicity: string;
  motherReligion: string;
  motherCaste: string | null;
  motherProfession: string | null;
  motherCountryOfResidence: string;
  motherAdditionalInfo: string | null;
  horoscopeMatching: boolean;
  age: number;
  birthDay?: Date;
  connection?: {
    status: ProposerMatchingProposalStatusEnum;
  };
};

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
};

export {
  ProposerStatusEnum,
  ProposerFoodPreferenceEnum,
  ProposerMatchingProposalStatusEnum,
};

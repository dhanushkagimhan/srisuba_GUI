import {
  GenderEnum,
  MarketerStatusEnum,
  PaymentStatusEnum,
  ProposerFoodPreferenceEnum,
  ProposerPaymentTypeEnum,
  ProposerStatusEnum,
} from "..";

type AdminLoginType = {
  email: string;
  password: string;
};

type AdminLoginVerifyType = {
  email?: string;
  code: string;
};

type adminProposerPaymentType = {
  key?: number;
  type: ProposerPaymentTypeEnum;
  value: number;
  status: PaymentStatusEnum;
  updatedAt: Date;
};

type AdminProposerType = {
  key?: number;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  birthDay: Date;
  status: ProposerStatusEnum;
  membershipExpiration: Date;
  createdAt: Date;
  updatedAt: Date;
  payments?: adminProposerPaymentType[];
};

type adminProposalType = {
  profilePhoto: string;
  otherPictures: string[] | null;
  bioTitle: string | null;
  bioDescription: string | null;
  whatsAppNumber: string;
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
  createdAt: Date;
  updatedAt: Date;
};

type AdminApproveProposerPaymentType = {
  proposerId: number;
};

type AdminChangeProposerStatusType = {
  proposerId: number;
  status: ProposerStatusEnum;
  reason?: string;
};

type AdminRenewProposerMembershipType = {
  proposerId: number;
};

type AdminMarketerType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  country: string;
  affiliateCode: string | null;
  accountBalance: number;
  status: MarketerStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

type AdminMarketerReferredProposerType = {
  id: number;
  paymentStatus: PaymentStatusEnum;
  paymentValue: number;
  proposerId: number;
  createdAt: Date;
  updatedAt: Date;
};

type AdminMarketerWithdrawalType = {
  id: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

type AdminMarketerBankAccountType = {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branch: string;
};

type AdminWithdrawMarketerIncomeType = {
  marketerId?: number;
  amount: number;
};

type AdminSystemDetailsType = {
  proposalPrice: number;
  systemIncomeBalance: number;
  totalSystemAccountBalance: number;
  totalAffiliateMarketersCost: number;
  createdAt: Date;
  updatedAt: Date;
};

type AdminWithdrawSystemIncomeType = {
  amount: number;
};

type AdminSystemWithdrawalType = {
  key?: number;
  id: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
};

type AdminChangeProposalPriceType = {
  price: number;
};

export type {
  AdminLoginType,
  AdminLoginVerifyType,
  adminProposerPaymentType,
  AdminProposerType,
  adminProposalType,
  AdminApproveProposerPaymentType,
  AdminChangeProposerStatusType,
  AdminRenewProposerMembershipType,
  AdminMarketerType,
  AdminMarketerReferredProposerType,
  AdminMarketerWithdrawalType,
  AdminMarketerBankAccountType,
  AdminWithdrawMarketerIncomeType,
  AdminSystemDetailsType,
  AdminWithdrawSystemIncomeType,
  AdminSystemWithdrawalType,
  AdminChangeProposalPriceType,
};

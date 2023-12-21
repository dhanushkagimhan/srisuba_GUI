import { GenderEnum, PaymentStatus } from "..";

enum MarketerStatusEnum {
  PendingEmailVerification = "PendingEmailVerification",
  EmailVerified = "EmailVerified",
}

type MarketerLoginType = {
  email: string;
  password: string;
};

type MarketerRegisterType = {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  country: string;
};

type MarketerEmailVerifyType = {
  email?: string;
  code: string;
};

type MarketerRegenEmailVerifyType = {
  email?: string;
};

type MarketerForgotPasswordType = {
  email?: string;
};

type MarketerResetPasswordType = {
  email?: string;
  code: string;
  newPassword: string;
  confirmNewPassword?: string;
};

type MarketerCreateAffiliateCodeType = {
  code: string;
};

type MarketerAffiliatedProposerType = {
  key: number;
  paymentValue: number;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  firstName: string;
  lastName: `${string}` & { length: 1 };
  country?: string;
};

type MarketerWithdrawalType = {
  key: number;
  value: number;
  createdAt: Date;
};

export type {
  MarketerLoginType,
  MarketerRegisterType,
  MarketerEmailVerifyType,
  MarketerRegenEmailVerifyType,
  MarketerForgotPasswordType,
  MarketerResetPasswordType,
  MarketerCreateAffiliateCodeType,
  MarketerAffiliatedProposerType,
  MarketerWithdrawalType,
};

export { MarketerStatusEnum };

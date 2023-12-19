import { GenderEnum } from "..";

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

export type {
  MarketerLoginType,
  MarketerRegisterType,
  MarketerEmailVerifyType,
  MarketerRegenEmailVerifyType,
  MarketerForgotPasswordType,
};

export { MarketerStatusEnum };

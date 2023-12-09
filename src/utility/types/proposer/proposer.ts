import { Gender } from "..";

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
  gender: Gender;
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

export type {
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
  ProposerForgotPasswordType,
};

export { ProposerStatusEnum };

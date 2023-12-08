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
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: Gender;
  referralCode?: string;
};

export type { ProposerLoginType, ProposerRegisterType };

export { ProposerStatusEnum };

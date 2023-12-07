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

export type { ProposerLoginType };

export { ProposerStatusEnum };

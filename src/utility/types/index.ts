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

enum MainLayoutNavEnum {
  postProposer,
}

export type { ProposerStatusEnum };

export { MainLayoutNavEnum };

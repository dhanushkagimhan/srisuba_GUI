import {
  GenderEnum,
  PaymentStatusEnum,
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

export type {
  AdminLoginType,
  AdminLoginVerifyType,
  adminProposerPaymentType,
  AdminProposerType,
};

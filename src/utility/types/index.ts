import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  ProposerStatusEnum,
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
  ProposerForgotPasswordType,
} from "./proposer/proposer";

enum Gender {
  Male = "Male",
  Female = "Female",
}

export type {
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
  ProposerRegenEmailVerifyType,
  ProposerForgotPasswordType,
};

export { MainLayoutNavEnum, Gender, ProposerStatusEnum };

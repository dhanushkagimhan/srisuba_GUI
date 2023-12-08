import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  ProposerStatusEnum,
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
} from "./proposer/proposer";

enum Gender {
  Male = "Male",
  Female = "Female",
}

export type {
  ProposerStatusEnum,
  ProposerLoginType,
  ProposerRegisterType,
  ProposerEmailVerifyType,
};

export { MainLayoutNavEnum, Gender };

import { MainLayoutNavEnum } from "./components/mainLayout/mainLayout";
import {
  ProposerStatusEnum,
  ProposerLoginType,
  ProposerRegisterType,
} from "./proposer/proposer";

enum Gender {
  Male = "Male",
  Female = "Female",
}

export type { ProposerStatusEnum, ProposerLoginType, ProposerRegisterType };

export { MainLayoutNavEnum, Gender };

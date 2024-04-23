import { EPrivacyGroup } from "constants/group/enum-privacy";
import { array, number, object, string } from "yup";
import { genRequire } from "./utils";

export const schemaFormCreateGroup = () => {
  return object().shape({
    nameGroup: string().required(genRequire("Tên nhóm")),
    privacyGroup: number()
      .default(EPrivacyGroup.PUBLIC)
      .oneOf([EPrivacyGroup.PUBLIC, EPrivacyGroup.PRIVATE]),
    regulationGroup: array().of(string().optional()),
  });
};

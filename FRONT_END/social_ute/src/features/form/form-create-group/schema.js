import { FileSize } from "constants/app.const";
import { FILE_ERROR } from "constants/error.const";
import { EPrivacyGroup } from "constants/group/enum-privacy";
import { checkFileMaxSize } from "utils/file.utils";
import { mixed, number, object, string } from "yup";
import { genRequire } from "./utils";

export const schemaFormCreateGroup = () => {
  return object().shape({
    nameGroup: string().required(genRequire("Tên nhóm")),
    privacy: number()
      .default(EPrivacyGroup.PUBLIC)
      .oneOf([EPrivacyGroup.PUBLIC, EPrivacyGroup.PRIVATE]),
    groupAvatar: mixed()
      .test("fileSize", FILE_ERROR.OVER_SIZE, (file) => {
        if (!file) return false;
        const isValid = checkFileMaxSize(file, FileSize.max);
        return isValid;
      })
      .test(
        "fileFormat",
        FILE_ERROR.NOT_VALID_TYPE,
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value.type),
      )
      .optional(),
  });
};

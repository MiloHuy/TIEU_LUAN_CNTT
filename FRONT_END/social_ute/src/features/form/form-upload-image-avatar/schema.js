import { FileSize } from "constants/app.const";
import { checkFileExtension, checkFileMaxSize } from "utils/file.utils";

const { object, mixed } = require("yup");

const schemaFormUploadImageAvatar = (keyName) => {
  return object().shape({
    [keyName]: mixed()
      .test("fileSize", "File Size is too large", (value) => {
        if (value === undefined) return false;
        const file = value;
        const isValid = checkFileMaxSize(file, FileSize.max);
        return isValid;
      })
      .test(
        "fileFormat",
        "Định dạng file không đúng xin vui lòng chọn lại.",
        (value) => {
          if (value === undefined) return false;
          const isValid = checkFileExtension(value, ["jpg", "jpeg", "png"]);
          return isValid;
        },
      ),
  });
};

export default schemaFormUploadImageAvatar;

const { object, mixed } = require("yup");

const schemaFormUploadImageAvatar = () => {
  return object().shape({
    post_img: mixed()
      .test(
        "fileSize",
        "File Size is too large",
        (value) => value && value.size <= 1024 * 1024 * 10, // 10MB
      )
      .test(
        "fileFormat",
        "File Format is not supported",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/jpg"].includes(value.type),
      ),
  });
};

export const schema = schemaFormUploadImageAvatar;

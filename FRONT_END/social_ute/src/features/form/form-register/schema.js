import { object, string } from "yup";

export const genformRegisterSchema = (formLabel) => {
  return object().shape({
    first_name: string(),
    last_name: string(),
    gmail: string()
      .typeError(`${formLabel.email} is not a valid email`)
      .matches(/hcmute.edu.vn/, {
        message: "Gmail phải chứa hcmute.edu.vn.",
        excludeEmptyString: false,
      }),
    phone_number: string()
      .typeError(`${formLabel.phone_number} is not a vailid`)
      .required(`${formLabel.phone_number} is required`)
      .min(10, "Hãy điền đủ 10 số.")
      .max(10, "Không điền quá 10 số."),
    id: string()
      .typeError(`${formLabel.phone_number} is not a vailid`)
      .required(`${formLabel.id} is required`)
      .max(8, "ID phải có đủ 8 số."),
    pass_word: string()
      .typeError(`${formLabel.pass_word}`)
      .required(`${formLabel.pass_word} is required`),
    role: string(),
  });
};

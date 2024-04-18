import { object, string } from "yup";

export const genSchemaFormLogin = (formLabel) => {
  return object().shape({
    phone_number: string()
      .typeError(`${formLabel.phone_number}`)
      .required(`${formLabel.phone_number} không được để trống`)
      .min(10, "Hãy điền đủ 10 số.")
      .max(10, "Không điền quá 10 số."),
    pass_word: string()
      .typeError(`${formLabel.pass_word}`)
      .required(`${formLabel.pass_word} không được để trống`),
  });
};

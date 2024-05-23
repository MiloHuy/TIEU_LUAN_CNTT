import { object, string } from "yup";
import { genMessRequired } from "../utils";

export const genSchemaFormLogin = (formLabel) => {
  return object().shape({
    phone_number: string()
      .typeError(`${formLabel.phone_number}`)
      .required(genMessRequired(formLabel.phone_number))
      .min(10, "Hãy điền đủ 10 số.")
      .max(10, "Không điền quá 10 số."),
    pass_word: string()
      .typeError(`${formLabel.pass_word}`)
      .required(genMessRequired(formLabel.pass_word)),
  });
};

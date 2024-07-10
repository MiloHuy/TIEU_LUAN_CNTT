import clsx from "clsx";
import { Button } from "components/button";
import { InputV2 } from "components/input-v2";
import SelectDepartment from "features/select/select-department";
import SelectRole from "features/select/select-role";
import { useFormik } from "formik";
import { useSelectDepartement } from "hook/useSelectDepartment";
import { useEffect, useMemo, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { genformRegisterSchema } from "./schema";
import { genLabelFormRegister, genOptionsPrivacyPost } from "./utils";
import { register } from "services/auth.svc";
import { errorHandler } from "utils/error-response.utils";
import { useNavigate } from "react-router-dom";

const clsBaseInput =
  "w-full text-lg  bg-white/90 h-[50px] border border-black/50";

const FormRegister = ({ className, handleNextForm, stepForm }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { departments, isLoading, handleFetchDepartment } =
    useSelectDepartement();

  const initFormRegister = {
    first_name: "",
    last_name: "",
    gmail: "",
    phone_number: "",
    pass_word: "",
    id: "",
    birth_day: "",
    gender: "",
    department: "",
    role: "",
  };
  const [formRegister, setFormRegister] = useState(initFormRegister);

  const handleInput = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return "";
      case 1:
        return "-translate-x-full min-w-[35vw]";
      default:
        break;
    }
  }, [stepForm]);

  const formLabel = genLabelFormRegister();
  const formRegisterSchema = useMemo(() => {
    genformRegisterSchema(formLabel);
  }, [formLabel]);

  const options = useMemo(() => genOptionsPrivacyPost(), []);

  const handleRegisterForm = async () => {
    try {
      const dataSubmit = {
        ...values,
        department: formRegister.department,
        role: formRegister.role,
      };
      // console.log("dataSubmit", dataSubmit);
      // await register(dataSubmit);

      handleNextForm && handleNextForm();
    } catch (err) {
      errorHandler(err);
    }
  };

  const formik = useFormik({
    initialValues: formRegister,
    validationSchema: formRegisterSchema,
    handleChange: { handleInput },
    handleSubmit: { handleRegisterForm },
  });
  const { values, errors } = formik;

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errors]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-3 items-center justify-center p-8 min-w-[55vw] h-[480px] font-quick_sans",
        `${checkStepToNextForm} transform duration-500 ease-in`,
        className
      )}
    >
      <h1 className="text-2xl font-bold text-center text-gray-900">Đăng ký</h1>

      <div className="grid grid-cols-2 gap-2 w-full">
        <InputV2
          type="text"
          name="first_name"
          placeholder={formLabel.first_name}
          value={values["first_name"]}
          className={clsBaseInput}
          onChange={formik.handleChange}
        />

        <InputV2
          type="text"
          name="last_name"
          value={values["last_name"]}
          placeholder={formLabel.last_name}
          className={clsBaseInput}
          onChange={formik.handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        <InputV2
          type="email"
          name="gmail"
          value={values["gmail"]}
          placeholder="a@hcmute.edu.vn"
          className={clsBaseInput}
          onChange={formik.handleChange}
        />

        <InputV2
          type="text"
          name="phone_number"
          value={values["phone_number"]}
          placeholder={formLabel.phone_number}
          className={clsBaseInput}
          onChange={formik.handleChange}
        />
      </div>

      <InputV2
        type="password"
        name="pass_word"
        value={values["pass_word"]}
        placeholder={formLabel.pass_word}
        className={clsBaseInput}
        onChange={formik.handleChange}
      />

      <div className="grid grid-cols-2 gap-2 w-full">
        <SelectRole
          className="h-[50px] text-lg text-black/80 border-black/50"
          options={options}
          values={formRegister["role"]}
          onSubmit={handleFetchDepartment}
          handleChange={setFormRegister}
        />

        <InputV2
          type="text"
          name="id"
          value={values["id"]}
          placeholder={formLabel.id}
          className={clsBaseInput}
          onChange={formik.handleChange}
        />
      </div>

      <SelectDepartment
        departments={departments}
        isLoading={isLoading}
        handleChange={setFormRegister}
      />

      <div className="w-full flex justify-center gap-5">
        <Button
          radius="sm"
          className="text-lg text-white font-bold  w-1/2 bg-[#3C43B7] rounded-lg h-[50px]"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </Button>

        <Button
          isDisabled={isDisabled}
          radius="sm"
          className="text-lg text-white font-bold  w-1/2 bg-[#3C43B7] rounded-lg h-[50px]"
          onClick={handleRegisterForm}
        >
          Tiếp theo
        </Button>
      </div>
    </div>
  );
};

export default FormRegister;

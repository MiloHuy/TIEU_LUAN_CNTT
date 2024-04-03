import clsx from "clsx";
import { Button } from "components/button";
import { InputV2 } from "components/input-v2";
import { ERROR_REGISTER } from "constants/error.const";
import SelectDepartment from "features/select/select-department";
import SelectRole from "features/select/select-role";
import { useFormik } from "formik";
import { useSelectDepartement } from "hook/useSelectDepartment";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkCodeInArray } from "utils/code-error.utils";
import { genformRegisterSchema } from "./schema";
import { genLabelFormRegister, genOptionsPrivacyPost } from "./utils";

const FormRegister = ({ className, handleNextForm, stepForm }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const { departments, isLoading, handleFetchDepartment } = useSelectDepartement()

  const initFormRegister = {
    first_name: '',
    last_name: '',
    gmail: '',
    phone_number: '',
    pass_word: '',
    id: '',
    birth_day: '',
    gender: '',
    department: '',
    role: ''
  }
  const [formRegister, setFormRegister] = useState(initFormRegister)


  const handleInput = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value })
  }

  const checkStepToNextForm = useMemo(() => {
    switch (stepForm) {
      case 0:
        return ''
      case 1:
        return '-translate-x-full min-w-[35vw]'
      default:
        break
    }
  }, [stepForm])

  const formLabel = genLabelFormRegister()
  const formRegisterSchema = useMemo(() => {
    genformRegisterSchema(formLabel)
  }, [formLabel])

  const options = genOptionsPrivacyPost()

  const handleRegisterForm = async (e) => {
    try {
      // await register(values)

      // toast.success('Đăng ký thành công!!!', {
      //     position: "bottom-right",
      //     autoClose: 1000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      // });
      handleNextForm && handleNextForm()
    }
    catch (err) {
      const { code } = err.response.data

      const messageError = checkCodeInArray(ERROR_REGISTER, code)

      toast.error(messageError, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const formik = useFormik({
    initialValues: formRegister,
    validationSchema: formRegisterSchema,
    handleChange: { handleInput },
    handleSubmit: { handleRegisterForm }
  })
  const { values, errors } = formik

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }
  }, [errors])

  return (
    <form
      className={clsx(
        'flex flex-col gap-3 items-center justify-center p-4 min-w-[55vw] min-h-[75vh]',
        `${checkStepToNextForm} transform duration-500 ease-in`,
        className
      )}
      onSubmit={formik.handleSubmit}
      onReset={formik.resetForm}
    >
      <h1 className="text-2xl font-bold font-quick_sans text-center">
        Đăng ký
      </h1>

      <div className='grid grid-cols-2 gap-2 w-full'>
        <InputV2
          type="text"
          name='first_name'
          placeholder={formLabel.first_name}
          value={values['first_name']}
          defaultValue=""
          className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
          onChange={formik.handleChange}
        />

        <InputV2
          type="text"
          name='last_name'
          value={values['last_name']}
          placeholder={formLabel.last_name}
          defaultValue=""
          className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
          onChange={formik.handleChange}
        />
      </div>

      <div className='grid grid-cols-2 gap-2 w-full'>
        <InputV2
          type="email"
          name="gmail"
          value={values['gmail']}
          defaultValue=""
          placeholder="a@hcmute.edu.vn"
          className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
          onChange={formik.handleChange}
        />

        <InputV2
          type="text"
          name='phone_number'
          value={values['phone_number']}
          placeholder={formLabel.phone_number}
          defaultValue=""
          className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
          onChange={formik.handleChange}
        />
      </div>

      <InputV2
        type="password"
        name='pass_word'
        value={values['pass_word']}
        placeholder={formLabel.pass_word}
        defaultValue=""
        className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
        onChange={formik.handleChange}
      />

      <div className='grid grid-cols-2 gap-2 w-full'>
        <SelectRole
          className='h-[50px] text-lg text-black/80 border-black/50'
          options={options}
          onSubmit={handleFetchDepartment}
          handleChange={setFormRegister}
        />

        <InputV2
          type="text"
          name='id'
          value={values['id']}
          placeholder={formLabel.id}
          defaultValue=""
          className="w-full text-lg font-quick_sans bg-white/90 h-[50px] border border-black/50"
          onChange={formik.handleChange}
        />
      </div>

      <SelectDepartment
        departments={departments}
        isLoading={isLoading}
        handleChange={setFormRegister} />

      <div className="w-full flex justify-center gap-5">
        <Button
          isDisabled={isDisabled}
          radius="sm"
          className="text-lg text-white font-bold font-quick_sans w-1/2 bg-[#3C43B7] rounded-lg"
          onClick={handleRegisterForm}
          type='submit'>
          Tiếp theo
        </Button>
      </div>
    </form>
  )
}

export default FormRegister

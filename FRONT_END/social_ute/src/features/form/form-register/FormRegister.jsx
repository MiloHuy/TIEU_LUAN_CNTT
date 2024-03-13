import { Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";
import { Button } from "components/button";
import Input from "components/input";
import { DATA_DEPARTMENT } from "constants/data/data.const";
import { ERROR_REGISTER } from "constants/error.const";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkCodeInArray } from "utils/code-error.utils";
import { object, string } from "yup";

const FormRegister = ({ className, handleNextForm, stepForm }) => {
    const [isDisabledFaculity, setDisabledFaculity] = useState(false)
    const [isDisabledDepartment, setDisabledDepartment] = useState(false)
    const [faculty, setFaculty] = useState(null)
    const [department_t, setDeparements] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)

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

    const handleInputSelectDepartment = (e) => {
        if (department_t && isDisabledFaculity === true)
            setDisabledFaculity(false)

        if (isDisabledFaculity === true) {
            setDeparements(e.target.value)
        }
        if (isDisabledFaculity === false) {
            setDisabledFaculity(!isDisabledFaculity)
            setDeparements(e.target.value)
        }
    }

    const handleInput = (e) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value, department: faculty | department_t })
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

    const formLabel = useMemo(() => ({
        first_name: 'Họ',
        last_name: 'Tên',
        email: 'Gmail',
        phone_number: 'Số điện thoại',
        id: 'MSSV',
        pass_word: 'Mật khẩu',
        department: 'Khoa/Phòng ban',
        role: 'Vai trò'
    }), [])

    const formRegisterSchema = useMemo(() => {
        return object().shape({
            first_name: string(),
            last_name: string(),
            gmail: string().typeError(`${formLabel.email} is not a valid email`).matches(/hcmute.edu.vn/, { message: "Gmail phải chứa hcmute.edu.vn.", excludeEmptyString: false }),
            phone_number: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.phone_number} is required`).min(10, "Hãy điền đủ 10 số.").max(10, "Không điền quá 10 số."),
            id: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.id} is required`).max(8, "ID phải có đủ 8 số."),
            pass_word: string().typeError(`${formLabel.pass_word}`).required(`${formLabel.pass_word} is required`),
            role: string()
        })
    }, [formLabel])

    const handleRegisterForm = async (e) => {
        try {
            faculty ? values['department'] = faculty : values['department'] = department_t
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
                <Input
                    // isRequired
                    type="text"
                    name='first_name'
                    placeholder={formLabel.first_name}
                    value={values['first_name']}
                    defaultValue=""
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />

                <Input
                    // isRequired
                    type="text"
                    name='last_name'
                    value={values['last_name']}
                    placeholder={formLabel.last_name}
                    defaultValue=""
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />
            </div>

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    // isRequired
                    type="email"
                    name="gmail"
                    value={values['gmail']}
                    defaultValue=""
                    placeholder="a@hcmute.edu.vn"
                    // errorMessage={errors?.gmail}
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />

                <Input
                    // isRequired
                    type="text"
                    name='phone_number'
                    value={values['phone_number']}
                    placeholder={formLabel.phone_number}
                    // errorMessage={errors?.phone_number}
                    defaultValue=""
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />
            </div>

            <Input
                // isRequired
                type="password"
                name='pass_word'
                value={values['pass_word']}
                placeholder={formLabel.pass_word}
                defaultValue=""
                className="w-full text-lg font-quick_sans"
                onChange={formik.handleChange}
            />

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    // isRequired
                    type="text"
                    name='id'
                    value={values['role']}
                    placeholder={formLabel.role}
                    // errorMessage={errors?.role}
                    defaultValue=""
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />

                <Input
                    // isRequired
                    type="text"
                    name='id'
                    value={values['id']}
                    placeholder={formLabel.id}
                    // errorMessage={errors?.id}
                    defaultValue=""
                    className="w-full text-lg font-quick_sans"
                    onChange={formik.handleChange}
                />

            </div>

            <Select
                // isRequired
                placeholder="Phòng ban"
                name='department'
                isDisabled={isDisabledDepartment}
                value={values['department']}
                className="w-full text-lg font-quick_sans"
                defaultValue='null'
                onChange={handleInputSelectDepartment}
            >
                {
                    DATA_DEPARTMENT.map((item) => {
                        return (
                            <SelectItem key={item.value}>{item.label}</SelectItem>
                        )
                    })
                }
            </Select>

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

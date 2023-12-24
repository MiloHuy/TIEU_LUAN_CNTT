import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";
import { DATA_DEPARTMENT, DATA_FACULITY } from "constants/data/data.const";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "services/auth.svc";
import { object, string } from "yup";

const FormRegister = (props) => {
    const [isDisabledFaculity, setDisabledFaculity] = useState(false)
    const [isDisabledDepartment, setDisabledDepartment] = useState(false)
    const [faculty, setFaculty] = useState(null)
    const [department_t, setDeparements] = useState(null)

    const handleOpenRegiser = () => {
        formik.resetForm();
        props.handleFunction('hidden')
    }

    const initFormRegister = {
        first_name: '',
        last_name: '',
        gmail: '',
        phone_number: '',
        pass_word: '',
        id: '',
        birth_day: '',
        gender: '',
        department: ''
    }

    const [formRegister, setFormRegister] = useState(initFormRegister)

    const handleInputSelectFaculity = (e) => {
        if (faculty && isDisabledDepartment === true) {
            setDisabledDepartment(false)
        }

        if (isDisabledDepartment === true) {
            setFaculty(e.target.value)
        }

        if (isDisabledDepartment === false) {
            setDisabledDepartment(!isDisabledDepartment)
            setFaculty(e.target.value)
        }
    }

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

    const formLabel = useMemo(() => ({
        first_name: 'Họ',
        last_name: 'Tên',
        email: 'Gmail',
        phone_number: 'Số điện thoại',
        id: 'MSSV',
        pass_word: 'Mật khẩu',
        department: 'Khoa/Phòng ban',
    }), [])

    const formRegisterSchema = useMemo(() => {
        return object().shape({
            first_name: string(),
            last_name: string(),
            gmail: string().typeError(`${formLabel.email} is not a valid email`).matches(/hcmute.edu.vn/, { message: "Gmail phải chứa hcmute.edu.vn.", excludeEmptyString: false }),
            phone_number: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.phone_number} is required`).max(10, "Hãy điền đủ 10 số."),
            id: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.id} is required`).max(8, "ID phải có đủ 8 số."),
            pass_word: string().typeError(`${formLabel.pass_word}`).required(`${formLabel.pass_word} is required`),
        })
    }, [formLabel])

    const handleRegisterForm = async (e) => {
        try {
            faculty ? values['department'] = faculty : values['department'] = department_t
            await register(values)

            toast.success('Đăng ký thành công!!!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => { handleOpenRegiser() }, 2000)

        }
        catch (err) {

            toast.error('Đăng ký thất bại!!!', {
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

    return (
        <form
            className={clsx('flex flex-col gap-3 items-center justify-center p-4 w-full h-full ', props.className)}
            onSubmit={formik.handleSubmit}
            onReset={formik.resetForm}
        >
            <h1 className="text-lg font-bold font-merriweather text-center">
                Đăng ký
            </h1>

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    isRequired
                    type="text"
                    name='first_name'
                    label={formLabel.first_name}
                    value={values['first_name']}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='last_name'
                    value={values['last_name']}
                    label={formLabel.last_name}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />
            </div>
            <Input
                isRequired
                type="email"
                name="gmail"
                value={values['gmail']}
                label={formLabel.email}
                defaultValue=""
                placeholder="a@hcmute.edu.vn"
                errorMessage={errors?.gmail}
                className="w-full"
                onChange={formik.handleChange}
            />

            <Input
                isRequired
                type="text"
                name='phone_number'
                value={values['phone_number']}
                label={formLabel.phone_number}
                errorMessage={errors?.phone_number}
                defaultValue=""
                className="w-full"
                onChange={formik.handleChange}
            />

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    isRequired
                    type="password"
                    name='pass_word'
                    value={values['pass_word']}
                    label={formLabel.pass_word}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='id'
                    value={values['id']}
                    label={formLabel.id}
                    errorMessage={errors?.id}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />
            </div>

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Select
                    isRequired
                    label="Khoa"
                    name='faculty'
                    value={values['department']}
                    defaultValue='null'
                    isDisabled={isDisabledFaculity}
                    placeholder="Chọn khoa"
                    className="w-full"
                    onChange={handleInputSelectFaculity}
                >
                    {
                        DATA_FACULITY.map((item) => {
                            return (
                                <SelectItem key={item.value}>{item.label}</SelectItem>
                            )
                        })
                    }
                </Select>

                <Select
                    isRequired
                    label="Phòng ban"
                    name='department'
                    isDisabled={isDisabledDepartment}
                    value={values['department']}
                    placeholder="Chọn phòng ban"
                    className="w-full"
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
            </div>

            <div className="w-4/5 flex items-center gap-5">
                <Button
                    radius="sm"
                    className="w-3/4 text-sm font-merriweather"
                    type='submit'
                >
                    <Link
                        className='text-sm col-span-1 font-merriweather'
                        onClick={handleOpenRegiser} href="#">
                        Đăng nhập
                    </Link>
                </Button>

                <Button
                    radius="sm"
                    className="w-3/4 text-sm font-merriweather"
                    onClick={handleRegisterForm}
                    type='submit'
                >Đăng ký
                </Button>
            </div>
        </form>
    )
}

export default FormRegister

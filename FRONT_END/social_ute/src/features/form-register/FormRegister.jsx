import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import clsx from "clsx";
import { DATA_DEPARTMENT, DATA_FACULITY } from "constants/data/data.const";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "services/auth.svc";
import { object, string } from "yup";

const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));

const FormRegister = (props) => {
    const [isDisabledFaculity, setDisabledFaculity] = useState(false)
    const [isDisabledDepartment, setDisabledDepartment] = useState(false)
    const [faculty, setFaculty] = useState(null)
    const [department_t, setDeparements] = useState(null)

    const handleOpenRegiser = () => {
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

    useEffect(() => {
        console.log("Department:" + department_t)
        console.log("Faculty:" + faculty)
    }, [department_t, faculty])

    const handleInput = (e) => {
        setFormRegister({ ...formRegister, [e.target.name]: e.target.value, department: faculty | department_t })
    }

    const formLabel = useMemo(() => ({
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Gmail',
        phone_number: 'Phone',
        id: 'ID',
        pass_word: 'Passwords',
        department: 'Department',
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

    const handleRegisterForm = async () => {
        try {
            faculty ? values['department'] = faculty : values['department'] = department_t
            const user_data = await register(values)
            console.log("user_data: ", user_data)

            toast.success('Đăng ký thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setTimeout(() => { handleOpenRegiser() }, 3000)
        }
        catch (err) {
            console.log("Error: ", err)
        }
    }

    const formik = useFormik({
        initialValues: formRegister,
        validationSchema: formRegisterSchema,
        handleChange: { handleInput },
        handleSubmit: { handleRegisterForm }
    })
    const { values, errors } = formik
    console.log('Values:', Object.values(values))

    return (
        <form
            className={clsx('flex flex-col gap-2 items-center justify-center p-4 w-full h-full ', props.className)}
            onSubmit={formik.handleSubmit}
        >
            <h1 className="text-lg font-bold font-merriweather text-center">
                Sign up
            </h1>

            <div className='grid grid-cols-2 gap-2 w-full'>
                <Input
                    isRequired
                    type="text"
                    name='first_name'
                    label={formLabel.first_name}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='last_name'
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
                    label={formLabel.pass_word}
                    defaultValue=""
                    className="w-full"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='id'
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
                    label="Faculty"
                    name='faculty'
                    defaultValue='null'
                    isDisabled={isDisabledFaculity}
                    placeholder="Select Faculty"
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
                    label="Department"
                    name='department'
                    isDisabled={isDisabledDepartment}
                    placeholder="Select department"
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

            <Button
                className="w-3/4 text-sm font-merriweather"
                // onClick={handleOpenRegiser}
                onClick={handleRegisterForm}
                type='submit'
            >Sign up
            </Button>

            <Link className='text-sm col-span-1 font-merriweather' onClick={handleOpenRegiser} href="#">Login</Link>
        </form>
    )
}

export default FormRegister

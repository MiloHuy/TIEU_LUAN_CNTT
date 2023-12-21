import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import clsx from "clsx";
import { DATA_DEPARTMENT, DATA_FACULITY } from "constants/data/data.const";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserInfo } from "services/me.svc";
import { object, string } from "yup";

const FormUpdateUser = (props) => {
    const [isDisabledFaculity, setDisabledFaculity] = useState(false)
    const [isDisabledDepartment, setDisabledDepartment] = useState(false)
    const [faculty, setFaculty] = useState(null)
    const [department_t, setDeparements] = useState(null)
    const { updateUser } = props
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectCurrenUser)

    console.log('user: ' + Object.entries(user))

    const initFormUpdateUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        gmail: user.gmail,
        phone_number: user.phone_number,
        id: user.id,
        birth_day: user.birth_day,
        gender: user.gender,
        department: user.department 
    }

    const [FormUpdateUser, setFormUpdateUser] = useState(initFormUpdateUser)

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
        setFormUpdateUser({ ...FormUpdateUser, [e.target.name]: e.target.value, department: faculty | department_t })
    }

    const formLabel = useMemo(() => ({
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Gmail',
        phone_number: 'Phone',
        id: 'ID',
        department: 'Department',
    }), [])

    const FormUpdateUserSchema = useMemo(() => {
        return object().shape({
            first_name: string(),
            last_name: string(),
            gmail: string().typeError(`${formLabel.email} is not a valid email`).matches(/hcmute.edu.vn/, { message: "Gmail phải chứa hcmute.edu.vn.", excludeEmptyString: false }),
            phone_number: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.phone_number} is required`).max(10, "Hãy điền đủ 10 số."),
            id: string().typeError(`${formLabel.phone_number} is not a vailid`).required(`${formLabel.id} is required`).max(8, "ID phải có đủ 8 số."),
        })
    }, [formLabel])

    const handleUpdateForm = async () => {
        try {
            faculty ? values['department'] = faculty : values['department'] = department_t
            setIsLoading(true)
            await updateUserInfo(values)
            setIsLoading(false)

            toast.success('Cập nhật thông tin thành công!!!', {
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
        catch (err) {
            console.log("Error: ", err)

            toast.error('Cập nhật thông tin thất bại!!!', {
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
        initialValues: FormUpdateUser,
        validationSchema: FormUpdateUserSchema,
        handleChange: { handleInput },
        handleSubmit: { handleUpdateForm }
    })
    const { values, errors } = formik

    return (
        updateUser ?
            <form
                className={clsx('flex flex-col gap-2 items-center justify-center p-4 w-full h-full ', props.className)}
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-lg font-bold font-merriweather text-center text-white dark:text-black">
                    Cập nhật thông tin cá nhân
                </h1>

                <div className='grid grid-cols-2 gap-2 w-full'>
                    <Input
                        isRequired
                        type="text"
                        name='first_name'
                        variant="bordered"
                        defaultValue={updateUser.user.first_name}
                        label={formLabel.first_name}
                        value={values['first_name']}
                        className="w-full text-white"
                        onChange={formik.handleChange}
                    />

                    <Input
                        isRequired
                        type="text"
                        variant="bordered"
                        name='last_name'
                        label={formLabel.last_name}
                        value={values['last_name']}
                        defaultValue={updateUser.user.last_name}
                        className="w-full text-white"
                        onChange={formik.handleChange}
                    />
                </div>
                <Input
                    isRequired
                    type="email"
                    name="gmail"
                    variant="bordered"
                    label={formLabel.email}
                    defaultValue={updateUser.user.gmail}
                    placeholder="a@hcmute.edu.vn"
                    errorMessage={errors?.gmail}
                    className="w-full text-white"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='phone_number'
                    variant="bordered"
                    label={formLabel.phone_number}
                    errorMessage={errors?.phone_number}
                    defaultValue={updateUser.user.phone_number}
                    className="w-full text-white"
                    onChange={formik.handleChange}
                />

                <Input
                    isRequired
                    type="text"
                    name='id'
                    label={formLabel.id}
                    variant="bordered"
                    errorMessage={errors?.id}
                    defaultValue={updateUser.user.id}
                    className="w-full text-white"
                    onChange={formik.handleChange}
                />

                <div className='grid grid-cols-2 gap-2 w-full'>
                    <Select
                        isRequired
                        label="Faculty"
                        variant="bordered"
                        name='faculty'
                        defaultValue='null'
                        isDisabled={isDisabledFaculity}
                        placeholder="Select Faculty"
                        className="w-full text-white"
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
                        variant="bordered"
                        isDisabled={isDisabledDepartment}
                        placeholder="Select department"
                        className="w-full text-white"
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
                    isLoading={isLoading}
                    className="w-3/4 text-sm font-merriweather"
                    onClick={handleUpdateForm}
                    type='submit'
                >Cập nhật
                </Button>
            </form> : <Spinner color="default" size="lg" />
    )
}

export default FormUpdateUser

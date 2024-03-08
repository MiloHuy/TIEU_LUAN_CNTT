import clsx from "clsx"
import { Button } from "components/button"
import Input from "components/input"
import { timeCountDown } from "constants/app.const"
import { useEffect, useMemo, useState } from "react"

const FormConfirmOtp = ({ title, formValues, className, nextForm, stepForm, handleNextForm }) => {
    const [otpValue, setOtpValue] = useState(null)
    const [countDown, setCountDown] = useState(timeCountDown.otp)
    const [isLoading, setIsloading] = useState(false)

    const handleChangeInput = (e) => {
        setOtpValue(e.target.value)
    }
    const checkStepToNextForm = useMemo(() => {
        switch (stepForm) {
            case 0:
                return 'translate-x-[700px]'
            case 1:
                return '-translate-x-[715px]'
            case 2:
                return '-translate-x-[1115px]'
            default:
                break
        }
    }, [stepForm])

    const handleVerifyOtp = async () => {
        // try {
        //     setIsloading(true)
        //     await verifyOtp(otpValue)

        //     setIsloading(false)
        // }
        // catch (err) {

        // }
        handleNextForm && handleNextForm()
    }

    useEffect(() => {
        if (countDown > 0 && nextForm === true) {
            const interval = setInterval(() => {
                setCountDown(countDown - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [countDown, nextForm]);

    return (
        <div className={clsx(
            'flex flex-col items-center justify-center gap-4 min-w-[35vw] max-h-[50vh] ',
            `${checkStepToNextForm} transform duration-500 ease-in `,
            className
        )}>
            <h1 className='text-center text-xl text-black font-quick_sans font-bold'>
                {title ? title : ''}
            </h1>

            <Input
                value={otpValue}
                placeholder="Nhập mã OTP"
                onChange={handleChangeInput}
                className='w-3/4 text-lg font-quick_sans text-black'
            />

            <p className="text-center text-xl text-black font-quick_sans">
                <span className="text-red">
                    {countDown}s
                </span> để nhập mã từ email
            </p>

            <div className="w-full flex justify-center">
                <Button
                    radius="sm"
                    isLoading={isLoading}
                    className="text-lg text-white font-bold font-quick_sans w-1/2 bg-[#3C43B7] rounded-lg"
                    type='submit'
                    onClick={handleVerifyOtp}
                >
                    Tiếp theo
                </Button>
            </div>
        </div>
    )
}

export default FormConfirmOtp

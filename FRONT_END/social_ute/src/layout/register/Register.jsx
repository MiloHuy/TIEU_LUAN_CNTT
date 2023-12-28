import { Image } from "@nextui-org/image"
import clsx from 'clsx'
import FormRegister from "features/form/form-register"

const Register = (props) => {
    const handleFunction = (value) => {
        props.handleCallbackRegister(value)
    }
    return (
        <div className={clsx('grid grid-cols-3 gap-1 justify-center items-center w-full h-fulll', props.className)}>
            <div className="flex justify-center col-span-2 items-center top-0 left-0 h-full w-full z-20">
                <FormRegister handleFunction={handleFunction} />
            </div>

            <div className="flex justify-center items-center">
                <Image
                    radius='lg'
                    alt="HCMUTE"
                // src={logo}
                />
            </div>
        </div>
    )
}

export default Register

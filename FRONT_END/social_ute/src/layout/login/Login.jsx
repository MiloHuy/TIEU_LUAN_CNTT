import { Image } from '@nextui-org/react'
import logo from 'assets/images/logo.png'
import clsx from 'clsx'
import FormLogin from 'features/form/form-login'

const Login = (props) => {
    const handleFunction = (value) => {
        props.handleCallbackLogin(value)
    }

    return (
        <div className={clsx('grid grid-cols-2 gap-1 justify-center items-center w-full h-full', props.className)}>
            <div className="flex justify-center items-center">
                <Image
                    // width={90}
                    // height={90}
                    loading='lazy'
                    radius='lg'
                    alt="HCMUTE"
                    src={logo}
                    className='object-cover p-4'
                />
            </div>

            <div className="flex justify-center items-center top-0 left-0 h-full w-full z-20">
                <FormLogin handleFunction={handleFunction} />
            </div>
        </div>

    )
}

export default Login

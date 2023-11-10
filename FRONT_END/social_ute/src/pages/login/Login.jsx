
import { Image } from '@nextui-org/react'
import logo from 'assets/images/logo.png'
import FormLogin from 'features/form-login'

const Login = () => {
    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute bg-cover '>
            <div className=" grid grid-cols-2 gap-1 h-3/4 w-1/2 rounded-[30px] border bg-transparent backdrop-blur-sm opacity-100 drop-shadow-md z-20">
                <div className='w-full h-full top-0 justify-center items-center flex'>
                    <Image
                        radius='lg'
                        isZoomed
                        alt="HCMUTE"
                        src={logo}
                    />
                </div>
                <div className="flex justify-center items-center top-0 left-0 h-full w-full z-20">
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}

export default Login

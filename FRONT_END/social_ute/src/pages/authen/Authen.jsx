import Login from "layout/login"
import Register from "layout/register"
import { useState } from "react"

const Authen = () => {
    const [openLogin, setOpenLogin] = useState('')
    const [openRegister, setOpenRegister] = useState('hidden')

    const handleCallbackLogin = (value) => {
        setOpenLogin(value)
        setOpenRegister('')
    }

    const handleCallbackRegister = (value) => {
        setOpenLogin('')
        setOpenRegister(value)
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute bg-cover '>
            <div className="relative h-4/5 w-3/4 rounded-[30px] border bg-transparent backdrop-blur-sm opacity-100 drop-shadow-md z-20">
                <Login handleCallbackLogin={handleCallbackLogin} className={openLogin} />
                <Register handleCallbackRegister={handleCallbackRegister} className={openRegister} />
            </div>
        </div>
    )
}

export default Authen

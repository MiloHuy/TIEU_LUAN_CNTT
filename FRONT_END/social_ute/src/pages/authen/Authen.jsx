import Login from "layout/login"
import { useState } from "react"

const Authen = () => {
    const [openLogin, setOpenLogin] = useState('')

    const handleCallbackLogin = (value) => {
        setOpenLogin(value)
    }

    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute_01 bg-cover '>
            <div className="relative h-4/5 w-[40vw] rounded-lg border bg-white/45 backdrop-blur-sm opacity-100 shadow-lg ">
                <Login handleCallbackLogin={handleCallbackLogin} className={openLogin} />
            </div>
        </div>
    )
}

export default Authen

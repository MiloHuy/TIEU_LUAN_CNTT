import FormLogin from "features/form/form-login"

const Authen = () => {
    return (
        <div className='flex justify-center items-center w-screen h-screen bg-bg_hcmute_01 bg-cover '>
            <div className="relative rounded-xl border bg-white/45 backdrop-blur-sm shadow-lg">
                <FormLogin />
            </div>
        </div>
    )
}

export default Authen

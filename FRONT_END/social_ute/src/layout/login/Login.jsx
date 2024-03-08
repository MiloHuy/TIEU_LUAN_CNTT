import clsx from 'clsx'
import FormLogin from 'features/form/form-login'

const Login = (props) => {
    const handleFunction = (value) => {
        props.handleCallbackLogin(value)
    }

    return (
        <div className={clsx('flex gap-1 justify-center items-center w-full h-full', props.className)}>
            <div className="flex justify-center items-center h-full w-full">
                <FormLogin handleFunction={handleFunction} />
            </div>
        </div>

    )
}

export default Login

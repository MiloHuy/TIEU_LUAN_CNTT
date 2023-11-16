import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from "@nextui-org/react"
import { setCredentials } from 'app/slice/auth/auth.slice'
import clsx from 'clsx'
import { useCookies } from "react-cookie"
import { useDispatch } from 'react-redux'
import { login } from 'services/auth.svc'
import { number, object } from 'yup'

const FormLogin = (props) => {
    const errRef = useRef()
    const [phone_number, setPhoneNumber] = useState('')
    const [pass_word, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [cookie, setCookies] = useCookies(['user'])

    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [phone_number, pass_word])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("phone_number:", phone_number)
            console.log("pwd:", pass_word)
            const userData = await login({ phone_number, pass_word })
            console.log('User data: ', userData)
            dispatch(setCredentials({ ...userData, phone_number, pass_word }))
            setCookies("user", phone_number, { path: "/" });
            setPhoneNumber('')
            setPwd('')
            navigate('/welcome')

        } catch (err) {

            // if (!err?.originalStatus) {
            //     setErrMsg('No Server Response');
            // } else if (err.originalStatus === 400) {
            //     setErrMsg('Missing phone_number or pass_word');
            // } else if (err.originalStatus === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
            console.error(err)
        }
    }

    const handleUserInput = (e) => setPhoneNumber(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const handleOpenLogin = () => {
        props.handleFunction('hidden')
    }

    const formLabel = useMemo(() => ({
        phone: 'Số điện thoại',
        pass_word: 'Mật khẩu'
    }), [])

    const formLoginSchema = useMemo(() => {
        return object().shape({
            phone: number().typeError(`${formLabel.phone}`).required(`${formLabel.phone} is required`),
            pass_word: number().typeError(`${formLabel.pass_word}`).required(`${formLabel.pass_word} is required`),
        })
    }, [formLabel])

    function getInputProps(name, type) {
        return {
            name,
            id: name,
            layout: 'vertical',
            defaultValue: props.defaultValues?.[name],
            label: formLabel[name]
        }
    }
    return (
        <form
            className={clsx('h-full w-full flex flex-col items-center justify-center', props.className)}
        >
            <h1 className='text-lg text-blue-950 font-bold font-merriweather text-center'>LOGIN</h1>

            <Input
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                type="number"
                placeholder="Please enter your phone"
                onChange={handleUserInput}
            />
            <Input
                className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                type="password"
                placeholder="Password"
                onChange={handlePwdInput}
            />
            <div className='flex flex-col gap-2 justify-center'>
                <Button onClick={handleSubmit} className='text-sm font-merriweather'>LOGIN</Button>
                <div className='grid grid-cols-4 gap-2 mt-2'>
                    <Link className='text-sm col-span-1 font-merriweather' onClick={handleOpenLogin} href="#">SIGN UP</Link>

                    <Link className='text-sm col-span-3 font-merriweather' href="#">FORGET YOUR pass_word?</Link>
                </div>

            </div>
        </form>
    )
}

export default FormLogin

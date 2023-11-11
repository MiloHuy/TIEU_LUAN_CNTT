import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Input } from "@nextui-org/react"
import { useLoginMutation } from 'app/slice/auth/auth-api.slice'
import { setCredentials } from 'app/slice/auth/auth.slice'
import { useCookies } from "react-cookie"
import { useDispatch } from 'react-redux'


const FormLogin = () => {

    const errRef = useRef()
    const [username, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [cookie, setCookies] = useCookies(['user'])

    const [login, { isLoading }] = useLoginMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("username:", username)
            console.log("pwd:", password)
            const userData = await login({ username, password })
            console.log('User data: ', userData)
            dispatch(setCredentials({ ...userData, username, password }))
            setCookies("user", username, { path: "/" });
            setUser('')
            setPassword('')
            navigate('/welcome')

        } catch (err) {

            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPassword(e.target.value)

    return (
        <form className='h-full w-full flex flex-col items-center justify-center'>
            <h1 className='text-lg text-blue-950 font-bold font-merriweather text-center'>LOGIN</h1>

            <Input className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full' type="email" placeholder="Email" />
            <Input className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full' type="password" placeholder="Password" />
            <div className='flex flex-row gap-2 justify-center'>
                <Button className='text-sm font-merriweather'>LOGIN</Button>
                <Button>
                    <Link className='text-sm font-merriweather' href="#">FORGET YOUR PASSWORD?</Link>
                </Button>
            </div>
        </form>
    )
}

export default FormLogin

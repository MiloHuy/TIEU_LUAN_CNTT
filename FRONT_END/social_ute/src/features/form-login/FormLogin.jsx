import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Image, Input } from "@nextui-org/react"
import { useCookies } from "react-cookie"
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../app/slice/auth/auth-api.slice'
import { setCredentials } from '../../app/slice/auth/auth.slice'
import logo from '../../assets/images/logo.png'

const Login = () => {

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

    const content = isLoading ? <h1>Loading...</h1> : (
        <section classNameNameName="login">
            <p ref={errRef} classNameNameName={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <Input className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                />

                <label htmlFor="password">Password:</label>
                <Input className='py-[10px] px-[15px] text-sm my-[8px] mx-0 rounded-sm w-full'
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePwdInput}
                />

                <Button type='submit'>LOG IN</Button>
            </form>
        </section>
    )

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
                </div>
            </div>
        </div>
    )
}
export default Login

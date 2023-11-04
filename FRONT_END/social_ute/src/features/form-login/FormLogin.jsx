import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCookies } from "react-cookie"
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../app/slice/auth/auth-api.slice'
import { setCredentials } from '../../app/slice/auth/auth.slice'

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
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePwdInput}
                />

                <button type='submit'>Sign In</button>
            </form>
        </section>
    )

    return content
}
export default Login

import React from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut, selectCurrentToken, selectCurrentUser } from '../../app/slice/auth/auth.slice'

const Welcome = () => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [cookies, removeCookie] = useCookies(['access-token'])
    const welcome = user ? `Welcome ${user}!` : `Welcome `

    const handleLogout = () => {
        dispatch(logOut())
        removeCookie(['access-token'])
        navigate('/')
    }

    return (
        <section >
            <h1>{token}</h1>
            <h1>{welcome}</h1>
            <button onClick={handleLogout}>
                Logout
            </button>
        </section>
    )
}

export default Welcome

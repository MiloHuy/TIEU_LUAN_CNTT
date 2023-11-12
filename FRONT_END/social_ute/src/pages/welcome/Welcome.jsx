import Sidebar from 'components/sidebar'
import { useState } from 'react'
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

    const [darkmode, setDarkMode] = useState('light')

    const handleLogout = () => {
        dispatch(logOut())
        removeCookie(['access-token'])
        navigate('/')
    }

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`w-screen h-screen bg-background text-primary ${darkmode}`}>
            <Sidebar handleController={handleDarkMode} className='absolute w-[200px] h-full border' />
        </div>
    )
}

export default Welcome

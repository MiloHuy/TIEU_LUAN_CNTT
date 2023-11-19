import { icons } from 'components/icon/siderbar.icon'
import Sidebar from 'components/sidebar'

import { useState } from 'react'
import { Outlet } from 'react-router'

const Welcome = () => {
    // const token = useSelector(selectCurrentToken)
    // const user = useSelector(selectCurrentUser)

    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    const [darkmode, setDarkMode] = useState('light')

    // const [cookies, removeCookie] = useCookies(['access-token'])
    // const welcome = user ? `Welcome ${user}!` : `Welcome `

    // const handleLogout = () => {
    //     dispatch(logOut())
    //     removeCookie(['access-token'])
    //     navigate('/')
    // }

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`w-screen grid grid-cols-6 gap-1 h-screen bg-background text-primary  overflow-auto ${darkmode}`}>
            <div className='col-span-1'>
                <Sidebar icons={icons} handleController={handleDarkMode} className='absolute max-w-[280px] h-full' />
            </div>
            <div className='col-span-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default Welcome

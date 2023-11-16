import { icons } from 'components/icon/siderbar.icon'
import Sidebar from 'components/sidebar'

import { useState } from 'react'

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
        <div className={`w-screen h-screen bg-background text-primary ${darkmode}`}>
            <Sidebar icons={icons} handleController={handleDarkMode} className='absolute w-[200px] h-full border' />
        </div>
    )
}

export default Welcome

import SidebarUser from 'layout/sidebar-user'
import { useState } from 'react'
import { Outlet } from 'react-router'
import { getUserIdFromCookie } from 'utils/user.utils'

const Welcome = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    const Id = getUserIdFromCookie()

    return (
        <div className={`w-screen h-screen gap-3 flex bg-background text-primary ${darkmode}`}>
            <div className='w-[20vw] border-r'>
                <SidebarUser
                    userID={Id}
                    handleController={handleDarkMode}
                    className='relative h-full' />
            </div>

            <div className={`min-w-[80vw] max-w-[80vw] ${darkmode}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Welcome

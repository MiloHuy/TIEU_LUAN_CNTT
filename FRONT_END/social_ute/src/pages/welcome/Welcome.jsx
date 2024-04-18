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
        <div className={`flex bg-background text-primary ${darkmode}`}>
            <SidebarUser
                userID={Id}
                handleController={handleDarkMode}
            />

            <div className={`min-w-[80vw] ${darkmode} overflow-auto`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Welcome

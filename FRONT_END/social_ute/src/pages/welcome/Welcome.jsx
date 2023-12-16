import SidebarUser from 'components/sidebar-user'

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
        <div className={`w-screen grid grid-cols-8 gap-1 h-screen bg-background text-primary absolute overflow-auto ${darkmode}`}>
            <div className='col-span-2'>
                <SidebarUser
                    userID={Id}
                    handleController={handleDarkMode}
                    className='relative max-w-[250px] h-full' />
            </div>

            <div className={`col-span-6 ${darkmode}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Welcome

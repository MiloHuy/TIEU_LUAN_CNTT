import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import SidebarAdmin from "components/sidebar-admin"
import { useState } from "react"
import { Outlet } from 'react-router'

const Manage = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    // const Id = getUserIdFromCookie()

    return (
        <div className={`w-screen grid grid-cols-8 gap-1 h-screen bg-background text-primary absolute overflow-auto ${darkmode}`}>
            <div className='col-span-2'>
                <SidebarAdmin
                    icons={sidebarIcons}
                    handleController={handleDarkMode}
                    className='relative max-w-[250px] h-full' />
            </div>

            <div className={`col-span-6 ${darkmode}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Manage

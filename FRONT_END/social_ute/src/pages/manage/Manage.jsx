import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import SidebarAdmin from "components/sidebar-admin"
import { useState } from "react"
import { Outlet } from 'react-router'

const Manage = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`w-screen grid grid-cols-8 gap-2 h-screen bg-background text-primary absolute overflow-auto ${darkmode}`}>
            <div className='col-span-2 max-w-[250px]'>
                <SidebarAdmin
                    icons={sidebarIcons}
                    handleController={handleDarkMode}
                    className='relative w-4/5 h-full border-r border-black dark:border-white' />
            </div>

            <div className={`col-span-6 ${darkmode}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Manage

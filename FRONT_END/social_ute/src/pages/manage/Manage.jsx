import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import SidebarAdmin from "layout/sidebar-admin"
import { useState } from "react"
import { Outlet } from 'react-router'

const Manage = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`w-[100vw] flex gap-2 h-screen bg-background text-primary absolute overflow-auto ${darkmode}`}>
            <div className='w-[20vw]'>
                <SidebarAdmin
                    icons={sidebarIcons}
                    darkmode={darkmode}
                    handleController={handleDarkMode}
                    className='relative w-3/4 h-full border-r border-black dark:border-white' />
            </div>

            <div className={`min-w-[77vw] ${darkmode}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Manage

import { sidebarIcons } from "components/icon/sidebar-admin.icon"
import Sidebar from "components/sidebar"
import { useState } from "react"
import { Outlet } from 'react-router'

const Admin = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className='grid grid-cols-8 gap-2 h-screen'>
            <div className='col-span-2'>
                <Sidebar icons={sidebarIcons} handleController={handleDarkMode} className='h-full' />
            </div>

            <div className='col-span-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
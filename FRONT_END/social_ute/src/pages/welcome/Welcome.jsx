import { icons } from 'components/icon/siderbar.icon'
import Sidebar from 'components/sidebar'

import { useState } from 'react'
import { Outlet } from 'react-router'

const Welcome = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className={`w-screen grid grid-cols-8 gap-1 h-screen bg-background text-primary absolute overflow-auto ${darkmode}`}>
            <div className='col-span-2'>
                <Sidebar icons={icons} handleController={handleDarkMode} className='relative max-w-[250px] h-full' />
            </div>

            <div className='col-span-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default Welcome

import { useState } from "react"

const Admin = () => {
    const [darkmode, setDarkMode] = useState('light')

    const handleDarkMode = (value) => {
        setDarkMode(value)
    }

    return (
        <div className='grid grid-cols-8 gap-2 h-screen'>

        </div>
    )
}

export default Admin

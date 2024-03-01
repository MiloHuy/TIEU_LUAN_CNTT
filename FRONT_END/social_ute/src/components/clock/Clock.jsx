import { Button } from "@nextui-org/react";
import { AlarmClock } from 'lucide-react';
import { useState } from "react";

const Clock = () => {
    const time = new Date().toLocaleTimeString()
    const [currentTime, setCurrentTime] = useState(time)

    const updateTime = () => {
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
    }

    setInterval(updateTime, 1000)

    return (
        <div className="w-[220px] border dark:border-white border-black rounded-lg flex justify-between px-2 items-center h-full">
            <h1 className="dark:text-white text-black font-nunito_sans text-2xl">
                {currentTime}
            </h1>

            <Button isIconOnly variant="light" size='sm'>
                <AlarmClock size={23} strokeWidth={1} />
            </Button>
        </div>
    )
}

export default Clock

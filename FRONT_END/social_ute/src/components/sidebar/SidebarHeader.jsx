import { clsx } from "clsx"

const SidebarHeader = (props) => {

    return (
        <div className={clsx('flex flex-col items-center ml-3 justify-center mt-3', props.className)}>
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>SOCIAL</h1>
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>HCMUTE</h1>
        </div>
    )
}

export default SidebarHeader

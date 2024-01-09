import { clsx } from "clsx"

const SidebarHeader = (props) => {

    return (
        <div className={clsx('flex flex-col items-center ml-3 justify-center mt-3', props.className)}>
            <h1 className='text-2xl text-black text-center dark:text-white font-bold font-young_serif  text-center'>SOCIAL</h1>
            <h1 className='text-2xl text-black text-center dark:text-white font-bold font-young_serif  text-center'>HCMUTE</h1>
        </div>
    )
}

export default SidebarHeader
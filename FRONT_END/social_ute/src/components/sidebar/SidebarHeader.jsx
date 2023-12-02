import { clsx } from "clsx"

const SidebarHeader = (props) => {

    return (
        <div className={clsx(' flex items-center justify-center p-4 ', props.className)}>
            <h1 className='text-2xl text-black dark:text-white font-bold font-merriweather text-center'>SOCIAL HCMUTE</h1>
        </div>
    )
}

export default SidebarHeader

import clsx from "clsx";
import { IconSideBarUser } from "constants/icons.const";
import SidebarShortCut from "layout/sidebar-short-cut/SidebarShortCut";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const SidebarUser = (props) => {
    const { userID, isShortCutSidebar } = props

    const handleController = (value) => {
        props.handleController(value)
    }

    const widthSidebar = isShortCutSidebar ? 'min-w-[5vw] w-[5vw]' : 'min-w-[20vw] w-[20vw]'

    return (
        <div className={clsx(
            'flex flex-col gap-4 min-h-[100vh] border-r border-black dark:border-white overflow-auto no-scrollbar',
            widthSidebar,
            'transform duration-500 ease-out',
            props.className)}>

            <SidebarHeader className='w-full h-[10vh]' isShortCutSidebar={isShortCutSidebar} />

            <div className='mt-4'>
                <SidebarBody
                    userID={userID}
                    className={`${isShortCutSidebar ? 'opacity-0 left-[18vw]' : 'opacity-100 left-0'} absolute px-2 transform duration-700 ease-in-out`} />

                <SidebarShortCut
                    userID={userID}
                    icons={IconSideBarUser}
                    className={`${isShortCutSidebar ? 'opacity-100 left-[0vw]' : 'opacity-0 '} absolute transform duration-700 ease-in-out `} />

            </div>

            <SidebarFooter
                handleSwitch={handleController}
                className='h-full flex items-end justify-center p-2'
            />
        </div>
    )
}

export default SidebarUser

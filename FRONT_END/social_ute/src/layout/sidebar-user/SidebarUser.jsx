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
            'flex flex-col gap-2 min-h-[100vh] border-r border-black dark:border-white overflow-hidden no-scrollbar',
            widthSidebar,
            'transform duration-500 ease-out',
            props.className)}>

            <SidebarHeader className='w-full h-[20vh]' isShortCutSidebar={isShortCutSidebar} />

            <div>
                <SidebarBody
                    userID={userID}
                    className={`${isShortCutSidebar === true ? 'opacity-0 left-[18vw]' : 'opacity-100 left-0'} absolute px-2 transform duration-700 ease-in-out`} />

                <SidebarShortCut
                    icons={IconSideBarUser}
                    className={`${isShortCutSidebar === true ? 'opacity-100 left-[0vw]' : 'opacity-0 '} absolute transform duration-700 ease-in-out `} />

            </div>

            <SidebarFooter
                handleSwitch={handleController}
                className='flex items-center justify-start p-0 m-auto'
            />
        </div>
    )
}

export default SidebarUser

import { Button } from "@nextui-org/react";
import { AlignJustify, Bell, Home, LogOut, PlusCircle, Search, UserCircle2 } from "lucide-react";
import { getUserIdFromCookie } from "utils/user.utils";

const Id = getUserIdFromCookie()

export const ButtonTrigger = () => {
    return (
        <Button>
            Open popup
        </Button>
    )
}

export const icons = [
    {
        name: "Home",
        icon: <Home />,
        link: '/welcome'
    },
    {
        name: "Search",
        icon: <Search />,
        link: ''
    },
    {
        name: "Nofitcation",
        icon: <Bell />,
        link: '',
        trigger: <ButtonTrigger />
    },
    {
        name: "User",
        icon: <UserCircle2 />,
        link: `home-user/${Id}`
    },
    {
        name: "Create",
        icon: <PlusCircle />,
        link: ''
    },
    {
        name: "More",
        icon: <AlignJustify />,
        link: ''
    },
    {
        name: "LogOut",
        icon: <LogOut />,
        link: ''
    },
]


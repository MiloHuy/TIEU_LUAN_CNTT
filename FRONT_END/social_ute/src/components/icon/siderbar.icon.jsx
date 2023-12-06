import { AlignJustify, Bell, Home, LogOut, PlusCircle, Search, UserCircle2 } from "lucide-react";
import { getUserIdFromCookie } from "utils/user.utils";

const Id = getUserIdFromCookie()

console.log('ID: ' + Id);

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
        link: ''
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

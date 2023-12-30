import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SSOCOOKIES } from 'constants/app.const';
import Cookies from 'js-cookie';
import { Link, Outlet } from 'react-router-dom';

const Public = () => {
    const token = Cookies.get(SSOCOOKIES.access)

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className='w-full flex px-4 border'>
                <Navbar className="w-full flex justify-start items-center">
                    <NavbarBrand justify="start">
                        <p className="text-2xl font-serif">SOCIAL HCMUTE</p>
                    </NavbarBrand>
                    <NavbarContent className="gap-4 " >
                        <NavbarItem>
                            <Link color="foreground" to="/home">
                                <p className="text-lg font-serif hover:underline">TRANG CHỦ</p>
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/about" aria-current="page">
                                <p className="text-lg font-serif hover:underline">NHÓM THỰC HIỆN</p>
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className="flex items-center">
                    <Button
                        as={Link}
                        to="#"
                        variant="light"
                        className="text-md font-serif"
                    >
                        {token ? <Link to='./welcome'>welcome</Link> : <Link to='./login'>Login</Link>}
                    </Button>
                </div>
            </div>

            <div className='w-full h-full flex'>
                <Outlet />
            </div>

        </div>
    )
}

export default Public

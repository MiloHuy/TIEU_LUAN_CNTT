import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SSOCOOKIES } from 'constants/app.const';
import Cookies from 'js-cookie';
import { Link, Outlet } from 'react-router-dom';

const Public = () => {
    const token = Cookies.get(SSOCOOKIES.access)

    return (
        <div>
            <Navbar>
                <NavbarBrand justify="start">
                    <p className="font-bold text-xl text-mono">SOCIAL HCMUTE</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color="foreground" to="/home">
                            <p className="font-bold text-lg text-mono">TRANG CHỦ</p>
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link to="/about" aria-current="page">
                            <p className="font-bold text-lg text-mono">GIỚI THIỆU</p>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" to="/report">
                            <p className="font-bold text-lg text-mono ">BÁO CÁO</p>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            as={Link}
                            to="#"
                            variant="flat"
                        >
                            {token ? <Link to='./welcome'>welcome</Link> : <Link to='./login'>Login</Link>}
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <Outlet />
        </div>
    )
}

export default Public

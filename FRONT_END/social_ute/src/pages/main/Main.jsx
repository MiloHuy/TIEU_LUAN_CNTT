import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { SSOCOOKIES } from 'constants/app.const';
import Cookies from 'js-cookie';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import About from "./About";
import Home from "./Home";

const Public = () => {
    const token = Cookies.get(SSOCOOKIES.access)
    const home = useRef(null)
    const about = useRef(null)

    const scrollSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth'
        })
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className='w-full flex px-4 border '>
                <Navbar className="w-full flex justify-start items-center">
                    <NavbarBrand justify="start">
                        <p className="text-2xl font-serif">SOCIAL HCMUTE</p>
                    </NavbarBrand>
                    <NavbarContent className="gap-4 " >
                        <NavbarItem>
                            <Link color="foreground" to="/home" onClick={() => scrollSection(home)}>
                                <p className="text-lg font-serif hover:underline">TRANG CHỦ</p>
                            </Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link to="/about" aria-current="page" onClick={() => scrollSection(about)}>
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

            <div ref={home} id='home' className='min-h-[100vh] '>
                <Home />
            </div>

            <div ref={about} id='about' className='min-h-[100vh]  '>
                <About />
            </div>

        </div>
    )
}

export default Public

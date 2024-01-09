import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { logOut } from 'app/slice/auth/auth.slice';
import clsx from 'clsx';
import { SSOCOOKIES } from 'constants/app.const';
import { USERCOOKIES } from 'constants/user.const';
import Cookies from 'js-cookie';
import { BarChartBig } from "lucide-react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'services/auth.svc';

const SidebarBody = (props) => {
    const { icons, className, darkmode } = props
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logout()

        dispatch(logOut)
    }

    const handleNaviageSidebar = (link) => {
        if (link === '/logout') {
            navigate('/login')
            handleLogout()
            Cookies.remove(USERCOOKIES.userID)
            Cookies.remove(SSOCOOKIES.access)
        }
        else {
            navigate(link)
        }
    }

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full flex flex-col gap-4 p-2'>
                {
                    icons.map((item) => {
                        return (
                            item.code === 'statistics'
                                ?
                                <Accordion
                                    className='border border-black dark:border-white rounded-lg font-merriweather font-bold text-black dark-text-white text-md '
                                    variant="bordered"
                                >
                                    <AccordionItem
                                        key="1"
                                        aria-label="Statistics"
                                        title="Thống kê"
                                        startContent={<BarChartBig size={20} strokeWidth={1} color={darkmode === 'light' ? '#000000' : '#FFFFFF'} />}
                                    >
                                        <div className='flex flex-col gap-2'>
                                            <Button
                                                className='border border-black w-full text-md font-bold font-kanit dark:border-white'
                                                size='sm'
                                                radius='sm'
                                                variant='bordered'
                                                onClick={() => navigate('/manage/statistics')}
                                            >
                                                Hệ thống
                                            </Button>

                                            <Button
                                                className='border border-black w-full text-md font-bold font-kanit dark:border-white'
                                                size='sm'
                                                radius='sm'
                                                variant='bordered'
                                                onClick={() => navigate('/manage/statistics/month')}
                                            >
                                                Trong tháng
                                            </Button>

                                            <Button
                                                className='border border-black w-full text-md font-bold font-kanit dark:border-white'
                                                size='sm'
                                                radius='sm'
                                                variant='bordered'
                                                onClick={() => navigate('/manage/statistics/month-details')}
                                            >
                                                Theo tháng
                                            </Button>
                                        </div>
                                    </AccordionItem>
                                </Accordion>

                                :
                                <div key={item.name} className='flex flex-row gap-2'>
                                    <Button
                                        className='w-full flex justify-start h-[50px] border border-black dark:border-white'
                                        color="default"
                                        variant="bordered"
                                        radius='sm'
                                        startContent={item.icon}
                                        onClick={() => handleNaviageSidebar(item.link)}
                                    >
                                        <h1 className='text-md text-black dark:text-white font-bold font-merriweather text-center'>
                                            {item.name}
                                        </h1>
                                    </Button>
                                </div>

                        )
                    })
                }
            </div>
        </div >
    )
}

export default SidebarBody

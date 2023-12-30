import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { selectCurrenUser } from "app/slice/auth/auth.slice";
import Calendar from "components/calendar";
import Clock from "components/clock";
import { BookImage } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getStatisticsUser } from "services/admin.svc";
import { dateTimeFormat } from "utils/format-date.utils";
import { getFullName } from "utils/user.utils";

const Admin = () => {
    const user = useSelector(selectCurrenUser)

    const [data, setData] = useState()

    const fetchStatistical = useCallback(async () => {
        try {
            const data_statistics = await getStatisticsUser(
                {
                    "month": new Date().getMonth() + 1
                }
            )

            setData(data_statistics.data)
        }
        catch (err) {
            toast.error('Có lỗi trong hệ thống.', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [])

    useEffect(() => {
        fetchStatistical()
    }, [fetchStatistical])

    return (
        <div className='flex gap-3 items-start justify-center w-full mt-3'>

            <div className='w-full h-full flex gap-5 flex-col justify-around'>
                <div className='flex gap-1 items-center'>
                    <h3 className="text-black dark:text-white font-mono text-2xl px-1 ">Chào : {user.last_name} </h3>
                    <h3 className='transform ease-in-out animate-handswipe top-2/4 right-2/4'>✋✋✋✋</h3>
                </div>

                <div className="grid grid-cols-2 gap-5 w-full border-black ">
                    <div className='border border-black w-full max-h-[180px] rounded-xl flex justify-center bg-[#B7DBE1] drop-shadow-lg'>
                        <div className='p-4 flex flex-col gap-4'>
                            <p className='text-black  font-mono text-xl'>Tổng số bài viết</p>
                            <div className='flex gap-1 items-center'>
                                <Button isIconOnly variant="light" size='sm'>
                                    <BookImage size={20} strokeWidth={1} color='#000000' />
                                </Button>
                                <p className='text-black font-mono text-xl'>{data ? data.totals_posts : <Spinner color="primary" size="sm" />} bài viết</p>
                            </div>
                        </div>
                    </div>

                    <div className='border border-white w-full max-h-[180px] rounded-xl flex justify-center bg-[#272727] drop-shadow-lg'>
                        <div className='p-4 flex flex-col gap-4'>
                            <p className='text-white font-mono text-xl'>Tổng số tài khoản</p>
                            <div className='flex gap-1 items-center'>
                                <Button isIconOnly variant="light" size='sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-user"><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></svg>
                                </Button>
                                <p className='text-white font-mono text-xl'>{data ? data.totals_accounts : <Spinner color="default" size="sm" />} tài khoản</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='w-full h-[200px] max-h-[200px] flex justify-center items-start mt-3'>
                    <Card
                        isBlurred
                        className="border-none bg-background/60 dark:bg-default-100/50 w-full h-full"
                        shadow="lg"
                        radius="lg"
                    >
                        <CardBody className="bg-[#efefed] flex items-center justify-center">
                            <div className="flex w-full gap-3 h-full items-center justify-center ">
                                <div className="h-full flex items-center w-4/5">
                                    <img
                                        alt="Album cover"
                                        className="object-fill w-full h-full rounded-md "
                                        shadow="md"
                                        src={user.avatar.url}
                                    />
                                </div>

                                <div className='flex flex-col gap-2 w-full items-center'>
                                    <p className="text-black  font-mono text-md">{getFullName(user.first_name, user.last_name)}</p>
                                    <p className="text-black  font-mono text-md">{dateTimeFormat(new Date(user.birth_day))}</p>
                                    <p className="text-black  font-mono text-md">{user.gender}</p>
                                    <p className="text-black  font-mono text-md">{user.phone_number}</p>
                                    <p className="text-black  font-mono text-md">{user.id}</p>
                                    <p className="text-black  font-mono text-md">{user.department}</p>

                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            <div className='h-full flex flex-col gap-3 items-start translate-x-4'>
                <div className="border border-black rounded-lg dark:border-white">
                    <Calendar />
                </div>

                <div className='flex w-full justify-end'>
                    <Clock />
                </div>
            </div>
        </div >
    )
}

export default Admin

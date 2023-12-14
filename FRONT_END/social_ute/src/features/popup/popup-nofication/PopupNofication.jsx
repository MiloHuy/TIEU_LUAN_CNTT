import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const PopupNofication = ({ trigger }) => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/welcome/home-user/65586f767e7818ca39b807fa')
    }

    return (
        <Popover
            placement="right"
            showArrow={false}
            classNames={{
                content: [
                    "py-3 px-4 border text-white",
                    'bg-bg_popup_primary'
                ],
            }}
        >

            <PopoverTrigger children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent className="w-[470px] h-[500px] overflow-auto">
                {(titleProps) => (
                    <div className=" py-1 w-full h-full flex flex-col gap-2">
                        <p className="text-2xl font-bold text-white font-open_sans" {...titleProps}>
                            Thông báo
                        </p>

                        <div className="mt-2 flex flex-col gap-2 w-full">
                            <div
                                onClick={handleNavigation}
                                className='flex gap-2'>
                                <img
                                    height='60px'
                                    width='60px'
                                    className="rounded-full "
                                    alt='friend'
                                    src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
                                />

                                <div className='flex justify-between items-center w-full'>
                                    <div className="flex gap-2 h-full items-center w-full">
                                        <p className="text-sm text-white w-[200px] dark:text-white font-open_sans ">
                                            userName đã gửi lời mời kết bạn cho bạn
                                        </p>

                                        <Button
                                            size='sm'
                                            color='primary'
                                            className="w-20"
                                        >
                                            Chấp nhận
                                        </Button>

                                        <Button
                                            size='sm'
                                            className="w-20 bg-bg_button_delete text-white">
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PopoverContent>

        </Popover>
    )
}

export default PopupNofication

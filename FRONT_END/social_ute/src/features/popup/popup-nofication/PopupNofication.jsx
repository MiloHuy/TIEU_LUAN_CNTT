import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { CheckCheck, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PopupNofication = ({ trigger }) => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/welcome/home-user/65586f767e7818ca39b807fa')
    }

    return (
        <Popover
            backdrop='opaque'
            placement="right"
            showArrow={false}
            classNames={{
                content: [
                    "py-3 px-4 border",
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
                                    <div className="flex gap-2 h-full items-center w-[250px]">
                                        userNameadadsdad vừa mới đăng tải một bài viết mới
                                    </div>

                                    <Dropdown
                                        className='bg-bg_dropdown_primary '
                                    >
                                        <DropdownTrigger>
                                            <Button
                                                className='w-[20px] '
                                                size="sm"
                                                isIconOnly
                                                variant="light"
                                            >
                                                <CircleDot size={16} strokeWidth={0.75} color='#ffffff' />

                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="unfriend"
                                        >
                                            <DropdownItem
                                                key="unfriend"
                                                className="text-white"
                                                endContent={<CheckCheck size={16} strokeWidth={0.75} />}
                                            >
                                                <p className='text-md font-open_sans font-bold gap-2'>
                                                    Đánh dấu là đã đọc
                                                </p>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
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

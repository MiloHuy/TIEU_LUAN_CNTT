import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger, Spinner, Tooltip } from "@nextui-org/react";
import { CheckCheck, CircleDot } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllNofications, readNofications } from "services/nofication.svc";

const PopupNofication = ({ trigger }) => {
    const navigate = useNavigate()
    const handleNavigation = (id) => {
        navigate(`/welcome/post/${id}`)
    }
    const [nofication, setNofication] = useState()

    const handleReadNofiContent = async (id) => {
        try {
            await readNofications(id)
        }
        catch (err) {

        }
    }

    const fetchAllNoficaiton = async () => {
        try {
            const data_nofi = await getAllNofications()
            setNofication(data_nofi.data)
        }
        catch (err) {

        }
    }

    return (
        <Popover
            backdrop='opaque'
            placement="right"
            showArrow={false}
            radius='sm'
            offset={12}
            classNames={{
                content: [
                    "py-3 px-4 border",
                    'bg-bg_popup_primary'
                ],
            }}
        >

            <PopoverTrigger
                onClick={fetchAllNoficaiton}
                children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent className="w-[470px] h-[500px] overflow-auto">
                {(titleProps) => (
                    <div className=" py-1 w-full h-full flex flex-col gap-2">
                        <p className="text-2xl font-bold text-white font-quick_sans" {...titleProps}>
                            THÔNG BÁO
                        </p>

                        {
                            nofication ?
                                nofication.notis.map((nofi) => {
                                    return (
                                        <div className="mt-2 flex flex-col gap-2 w-full justify-center cursor-pointer border h-[70px] rounded-lg px-2" >
                                            <Tooltip content="Nhấn để xem chi tiết" placement='top-end' delay={2000}>
                                                <div
                                                    onClick={() => handleNavigation(nofi.post_id)}
                                                    className='flex gap-2'>
                                                    <img
                                                        height='60px'
                                                        width='60px'
                                                        className="rounded-full "
                                                        alt='friend'
                                                        src={nofi.avatar.url}
                                                    />

                                                    <div className='flex justify-between items-center w-full'>
                                                        <div className={`flex gap-2 h-full items-center w-[250px] text-white ${nofi.read ? '' : 'font-bold'}`}>
                                                            {nofi.noti_content}
                                                        </div>

                                                        <Dropdown
                                                            className='bg-bg_dropdown_primary '
                                                        >
                                                            <DropdownTrigger>
                                                                <Button
                                                                    onClick={handleReadNofiContent}
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
                                                                    <p className='text-md font-quick_sans font-bold gap-2'>
                                                                        Đánh dấu là đã đọc
                                                                    </p>
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    )
                                })

                                :
                                <div className='w-full h-full flex items-center justify-center'>
                                    <Spinner color="default" size="lg" />
                                </div >
                        }
                    </div>
                )}
            </PopoverContent>

        </Popover >
    )
}

export default PopupNofication

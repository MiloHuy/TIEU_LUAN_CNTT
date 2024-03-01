import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Ban, CheckCircle, CheckCircle2 } from 'lucide-react';

const CellAction = ({ row }) => {
    const { _id, is_active } = row.original

    // const handleActiveAccount = async (id) => {
    //     try {
    //         setIsActive(true)
    //         const account = await activeUserAdmin(id)

    //         setData(account)

    //         setPagination((prev) => ({
    //             ...prev,
    //             pagIndex: 1
    //         }))

    //         setFilter((prev) => ({
    //             ...prev,
    //             page: 1
    //         }))

    //         setIsActive(false)

    //         toast.success('Thao tác thành công.', {
    //             position: "bottom-right",
    //             autoClose: 2000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         })

    //     }
    //     catch (err) {
    //         setIsActive(false)

    //         toast.success('Thao tác thất bại!!!', {
    //             position: "bottom-right",
    //             autoClose: 2000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         })
    //     }
    // }

    return (
        is_active === true ?
            <div className="w-full flex justify-center ">
                <Popover placement="bottom" radius='sm'>
                    <PopoverTrigger>
                        <CheckCircle size={20} color="#28e60f" strokeWidth={1} className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className='h-15 w-[200px]'>
                        <div className="flex gap-1 items-center justify-between w-full cursor-pointer">
                            <p className="text-md"
                            // onClick={() => handleActiveAccount(_id)}
                            >Vô hiệu hóa tài khoản</p>
                            <Ban size={18} strokeWidth={1} color="#be2d2d" />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            :
            <div className="w-full flex justify-center ">
                <Popover placement="bottom" radius='sm'>
                    <PopoverTrigger>
                        <Ban size={16} color="#be2d2d" className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className='h-15 w-[200px]'>
                        <div className="flex gap-1 items-center justify-between w-full cursor-pointer">
                            <p className="text-md"
                            // onClick={() => handleActiveAccount(_id)}
                            >
                                Kích hoạt tài khoản
                            </p>
                            <CheckCircle2 size={18} strokeWidth={1} color="#28e60f" />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
    )
}

export default CellAction

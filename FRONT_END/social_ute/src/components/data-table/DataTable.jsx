import { Popover, PopoverContent, PopoverTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Ban, CheckCircle, CheckCircle2 } from 'lucide-react';
import { useCallback } from "react";
import { getFullName } from "utils/user.utils";

const DataTable = ({ columns, data, isLoading, onDelete, bottomContent }) => {
    const handleOnDelete = (id) => {
        if (!onDelete) return
        onDelete(id)
    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "username":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans font-bold'>
                        {getFullName(user.first_name, user.last_name)}
                    </h1>
                );
            case "phone_number":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans font-bold'>
                        {user.phone_number}
                    </h1>
                );
            case "id":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans font-bold'>
                        {user.id}
                    </h1>
                );
            case "gmail":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans font-bold truncate'>
                        {user.gmail}
                    </h1>
                );
            case "department":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans font-bold'>
                        {user.department}
                    </h1>
                );
            case "action":
                return (
                    <div className="relative flex items-center gap-2 w-full">
                        {
                            user.is_active ?
                                <Popover placement="bottom" radius='sm'>
                                    <PopoverTrigger>
                                        <CheckCircle size={20} color="#28e60f" strokeWidth={1} className="cursor-pointer" />
                                    </PopoverTrigger>

                                    <PopoverContent className='h-15 w-[200px]'>
                                        <div className="flex gap-1 items-center justify-between w-full cursor-pointer">
                                            <p className="text-md" onClick={() => handleOnDelete(user._id)}>Vô hiệu hóa tài khoản</p>
                                            <Ban size={18} strokeWidth={1} color="#be2d2d" />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                :
                                <Popover placement="bottom" radius='sm'>
                                    <PopoverTrigger>
                                        <Ban size={16} color="#be2d2d" className="cursor-pointer" />
                                    </PopoverTrigger>

                                    <PopoverContent className='h-15 w-[200px]'>
                                        <div className="flex gap-1 items-center justify-between w-full cursor-pointer">
                                            <p className="text-md" onClick={() => handleOnDelete(user._id)}>Kích hoạt tài khoản</p>
                                            <CheckCircle2 size={18} strokeWidth={1} color="#28e60f" />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                        }
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div
            className='w-full h-full border-black dark:border-white'>
            <Table
                classNames={{
                    th: 'border-b rounded-none border-black dark:border-white font-bold text-black dark:text-white',
                    tbody: 'border-b border-black dark:border-white h-[250px] w-full',

                }}
                removeWrapper
                layout="fixed"
                bottomContent={bottomContent}
            >
                <TableHeader columns={columns} >
                    {(column) => <TableColumn
                        key={column.key}
                        allowsSorting={column.allowsSorting}
                        align='center'
                    >
                        {column.label}
                    </TableColumn>}
                </TableHeader>
                {
                    data && data.length !== 0 ?
                        <TableBody
                            items={data}
                            isLoading={isLoading}
                            className='gap-2'
                            loadingContent={<Spinner label="Loading..." />
                            }
                        >
                            {(item) => (
                                <TableRow key={item.username}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey, item._id)}</TableCell>}
                                </TableRow >
                            )}
                        </TableBody >
                        :
                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                }

            </Table >
        </div >

    )
}

export default DataTable

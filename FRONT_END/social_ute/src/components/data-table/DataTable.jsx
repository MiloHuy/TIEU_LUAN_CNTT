import { Button, Popover, PopoverContent, PopoverTrigger, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Ban, CheckCircle2 } from 'lucide-react';
import { useCallback } from "react";
import { getFullName } from "utils/user.utils";

const DataTable = ({ columns, data, isLoading, onDelete }) => {
    const handleOnDelete = (id) => {
        if (!onDelete) return
        onDelete(id)
    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "username":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans'>
                        {getFullName(user.first_name, user.last_name)}
                    </h1>
                );
            case "phone_number":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans'>
                        {user.phone_number}
                    </h1>
                );
            case "id":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans'>
                        {user.id}
                    </h1>
                );
            case "gmail":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans truncate'>
                        {user.gmail}
                    </h1>
                );
            case "department":
                return (
                    <h1 className='text-md text-black dark:text-white font-open_sans'>
                        {user.department}
                    </h1>
                );
            case "action":
                return (
                    <div className="relative flex items-center gap-2">
                        <Popover placement="bottom" radius='sm'>
                            <PopoverTrigger>
                                <Button className=' dark:bg-white' isIconOnly variant="light" >
                                    <Ban size={16} color="#be2d2d" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='h-10 w-[120px]'>
                                <div className="flex gap-1 items-center justify-between w-full cursor-pointer">
                                    <p className="text-md" onClick={() => handleOnDelete(user._id)}>Xác nhận</p>
                                    <CheckCircle2 size={18} strokeWidth={1} />
                                </div>
                            </PopoverContent>
                        </Popover>
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
                    th: 'border-b rounded-none border-black dark:border-white',
                    tbody: 'border-b'
                }}
                removeWrapper
                layout="fixed"
            >
                <TableHeader columns={columns} >
                    {(column) => <TableColumn
                        key={column.key}
                        allowsSorting={column.allowsSorting}
                        align='center'>
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

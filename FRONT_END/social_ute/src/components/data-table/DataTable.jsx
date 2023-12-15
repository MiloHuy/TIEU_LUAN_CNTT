import { Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { PenSquare, Trash2 } from 'lucide-react';
import { useCallback, useState } from "react";
import { dateTimeFormat, hourTimeFormat } from "utils/format-date.utils";

const DataTable = ({ columns, data, isLoading, onDelete }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [usernameInfo, setUserInfo] = useState({
        username: '',
        _id: ''
    })

    const handleOnDelete = (id) => {
        if (!onDelete) return
        onDelete(id)
    }

    const handleEditPassWord = (username, id) => {
        try {
            if (!onDelete) return
            onOpen()
            setUserInfo({
                ...username,
                username: username,
                _id: id
            })
        } catch (error) {

        }
    }

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.name}
                    </h1>
                );
            case "username":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.username}
                    </h1>
                );
            case "role":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {user.role}
                    </h1>
                );
            case "createdAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.createdAt)), dateTimeFormat(new Date(user.createdAt))].join(" - ")}
                    </h1>
                );
            case "updatedAt":
                return (
                    <h1 className='text-sm text-black dark:text-white '>
                        {[hourTimeFormat(new Date(user.updatedAt)), dateTimeFormat(new Date(user.updatedAt))].join(" - ")}
                    </h1>
                );
            case "action":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleEditPassWord(user.name, user._id)}>
                            <PenSquare size={16} color="#0a0a0a" />
                        </Button>

                        <Button className=' dark:bg-white' isIconOnly variant="light" onClick={() => handleOnDelete(user._id)}>
                            <Trash2 size={16} color="#be2d2d" />
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div
            className='max-w-[800px] min-w-[700px] min-h-[300px] p-4 overflow-x-hidden'>
            <Table
                isStriped
                layout="fixed">
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
                            loadingContent={<Spinner label="Loading..." />}
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

            {/* <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <FormSetPassword usernameInfo={usernameInfo} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal> */}
        </div>

    )
}

export default DataTable

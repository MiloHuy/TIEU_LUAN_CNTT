import { getFullName } from "utils/user.utils";
import CellAction from "./CellAction";

const columnsVersion2 = [
    {
        id: 'username',
        accessorKey: 'username',
        header: 'UserName',
        enableSorting: false,
        cell: ({ row }) => {
            return getFullName(row.original.first_name, row.original.last_name)
        }
    },
    {
        id: 'phone_number',
        accessorKey: 'phone_number',
        header: 'Phone Number',
        enableSorting: false,
    },
    {
        id: 'id',
        accessorKey: 'id',
        header: 'Mssv',
        enableSorting: false,
    },
    {
        id: 'gmail',
        accessorKey: 'gmail',
        header: 'Gmail',
        enableSorting: false,
    },
    {
        id: 'department',
        accessorKey: 'department',
        header: 'Department',
        enableSorting: false,
    },
    {
        id: 'action',
        accessorKey: 'action',
        header: () => {
            return (
                <div className="w-full flex justify-center">
                    Action
                </div>
            )
        },
        cell: CellAction,
        enableSorting: false,
    },
];

export default columnsVersion2

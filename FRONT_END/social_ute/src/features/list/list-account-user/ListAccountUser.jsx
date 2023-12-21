import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import DataTable from "components/data-table";
import DataTablePagination from "components/data-table-pagination";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getAllAccountUser } from "services/admin.svc";
import columns from "./columns";

const ListAccountUser = (props) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 4,
        totals: 2
    })

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
    })

    const fetchAccounts = useCallback(async (page, pageSize) => {
        try {
            setIsLoading(true)
            const initialData = await getAllAccountUser({
                page: page,
                size: pageSize,
            })
            setData(initialData.data)

            setIsLoading(false)

            const { totals } = initialData.data
            setPagination((prev) => (({
                ...prev,
                totals: totals
            })))

        } catch (error) {
            console.log(error)
        }
    }, [])

    const handlePageChange = useCallback((newPage) => {
        setFilter((prev) => ({
            ...prev,
            page: newPage
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: newPage
        }))
    }, [])

    useEffect(() => {
        fetchAccounts(
            filter.page,
            filter.size,
        )

    }, [fetchAccounts, filter.page, filter.size])

    const handleSearch = useCallback((newFilter) => {
        setFilter((prev) => ({
            ...prev,
            page: 1,
            search: newFilter.searchTerm
        }))

        setPagination((prev) => ({
            ...prev,
            pagIndex: 1
        }))
    }, [])

    const handleDeleteAccount = async (id) => {
        try {
            // const account = await deleteAccounts(id)

            // setData(account)
            setFilter((prev) => ({
                ...prev,
                page: 1
            }))

            toast.success('Xóa account thành công!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        catch (err) {
            console.log(err)

            toast.success('Xóa account thất bại!!!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <div className={clsx('flex items-center justify-center flex-col gap-5', props.className)}>
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH TÀI KHOẢN CỦA NGƯỜI DÙNG.
            </h1>

            <div className="grid grid-cols-1 gap-5 h-[350px] items-center border border-black dark:border-white rounded-lg">
                {
                    data ?
                        <DataTable
                            isLoading={isLoading}
                            columns={columns}
                            data={data.all_user}
                            onDelete={handleDeleteAccount}
                        />
                        :
                        <div className='w-full h-full flex items-center justify-center'>
                            <Spinner
                                size="lg"
                                label="Loading"
                                color="default"
                            />
                        </div>
                }

                <DataTablePagination
                    pagination={pagination}
                    onPageChange={handlePageChange} />
            </div>
        </div>
    )

}

export default ListAccountUser

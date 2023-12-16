import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import DataTable from "components/data-table";
import DataTablePagination from "components/data-table-pagination";
import SearchBlockDebounce from "components/search-block-debounce";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import columns from "./columns";

const ListAccountUser = (props) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [pagination, setPagination] = useState({
        pagIndex: 1,
        size: 2,
        totals: 2
    })

    const [filter, setFilter] = useState({
        page: 1,
        size: 4,
        search: '',
    })

    const fetchAccounts = useCallback(async (page, pageSize, search) => {
        try {
            // const initialData = await getAllAccounts({
            //     page: page,
            //     size: pageSize,
            //     search: search
            // })
            // setData(initialData)

            setIsLoading(!isLoading)

            // const { size, totals } = initialData.data
            // setPagination((prev) => (({
            //     ...prev,
            //     size: size,
            //     totals: totals
            // })))

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
            filter.search)

    }, [fetchAccounts, filter.page, filter.size, filter.search])

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
                hideProgressBar: false,
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
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <div className={clsx('flex items-center justify-center flex-col gap-3', props.className)}>
            <h1 className='text-sm text-black dark:text-white font-bold font-merriweather text-center'>
                DANH SÁCH TÀI KHOẢN CỦA NGƯỜI DÙNG.
            </h1>

            <div className='w-full flex items-start mt-2'>
                <SearchBlockDebounce
                    className='flex items-start w-1/3'
                    onSubmit={handleSearch} />
            </div>

            {
                data ?
                    <DataTable
                        isLoading={isLoading}
                        columns={columns}
                        data={[]}
                        onDelete={handleDeleteAccount}
                    /> :
                    <Spinner
                        size="lg"
                        label="Loading"
                        color="default"
                    />
            }


            <DataTablePagination
                pagination={pagination}
                onPageChange={handlePageChange} />
        </div>
    )

}

export default ListAccountUser

import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import DataTablePagination from "components/data-table-pagination";
import { DataTableV2 } from "components/data-table-v2";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { activeUserAdmin, getAllAccountUser } from "services/admin.svc";
import columnsVersion2 from "./columns";

const ListAccountUserVersion2 = (props) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isActive, setIsActive] = useState(false)

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

    const handleActiveAccount = async (id) => {
        try {
            setIsActive(true)
            const account = await activeUserAdmin(id)

            setData(account)

            setPagination((prev) => ({
                ...prev,
                pagIndex: 1
            }))

            setFilter((prev) => ({
                ...prev,
                page: 1
            }))

            setIsActive(false)

            toast.success('Thao tác thành công.', {
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
            setIsActive(false)

            toast.success('Thao tác thất bại!!!', {
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
        <div className={clsx('flex items-center justify-center flex-col gap-5 w-full', props.className)}>
            <div className='w-full'>
                <h1 className='text-[30px] text-black dark:text-white font-extrabold font-questrial text-start'>
                    DANH SÁCH TÀI KHOẢN CỦA NGƯỜI DÙNG.
                </h1>
            </div>

            <div className="grid grid-cols-1 gap-5 h-max w-full items-center dark:border-white rounded-lg">
                {
                    data ?
                        <div className='flex flex-col gap-3 '>
                            <DataTableV2
                                columns={columnsVersion2}
                                data={data.all_user}
                                className='text-black border border-black rounded-lg dark:text-white dark:border-white'
                            />

                            <DataTablePagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                                isActive={isActive}
                            />
                        </div>
                        :
                        <div className='w-full h-full flex items-center justify-center'>
                            <Spinner
                                size="lg"
                                label="Loading"
                                color="default"
                            />
                        </div>
                }
            </div>
        </div>
    )
}

export default ListAccountUserVersion2

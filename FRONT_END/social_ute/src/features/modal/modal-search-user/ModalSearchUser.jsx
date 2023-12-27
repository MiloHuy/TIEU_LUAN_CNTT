import { Modal, ModalContent } from "@nextui-org/react";
import SearchBlockDebounce from "components/search-block-debounce";
import ListSearchUser from "features/list/list-search-user";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserSearch } from "services/user.svc";

const ModalSearchUser = ({ isOpen, onOpenChange, onCloseModal }) => {
    const [searchParams, setSearchParams] = useSearchParams('')
    const [userSearch, setUserSearch] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [filter, setFilter] = useState({
        page: 1,
        size: 0,
        search: ''
    })

    const handleSearchDebounce = (query) => {

        setSearchParams(query)

        setFilter((prev) => ({
            ...prev,
            size: 3,
            search: query.search
        }))
    }

    const fetchUserSearch = useCallback(async (page, pageSize, search) => {
        try {
            setIsLoading(true)
            const initialData = await getUserSearch(
                {
                    page: page,
                    size: pageSize + 3,
                    search: search
                })

            setUserSearch(initialData)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }, [])

    useEffect(() => {
        if (filter.size !== 0) {
            fetchUserSearch(
                filter.page,
                filter.size,
                filter.search
            )
        }
    }, [fetchUserSearch, filter.size, filter.page, filter.search])

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onCloseModal}
            hideCloseButton
            radius="sm"
            size='2xl'
            backdrop='blur'
            scrollBehavior='outside'
            classNames={{
                base: "border-[#ffffff] bg-[#CCD9E7] dark:bg-black text-[#a8b0d3] h-[350px] py-3 px-6",
            }}
        >
            <ModalContent>
                {
                    (onClose) => (
                        <div className='flex flex-col w-full h-full gap-5 '>
                            <SearchBlockDebounce
                                className='w-full'
                                onSubmit={handleSearchDebounce}
                            />
                            {
                                userSearch ?
                                    <div className='w-full h-4/5 overflow-auto'>
                                        <ListSearchUser
                                            isLoading={isLoading}
                                            userSearch={userSearch.data}
                                        // onCloseModal={onClose}
                                        />
                                    </div>

                                    :
                                    <p className="text-lg font-mono text-black">
                                        Chưa có ai hiện tại
                                    </p>
                            }
                        </div>
                    )
                }
            </ModalContent>
        </Modal>
    )
}

export default ModalSearchUser

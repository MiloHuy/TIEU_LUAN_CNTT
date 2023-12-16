import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import SearchBlockDebounce from "components/search-block-debounce";
import ListSearchUser from "features/list/list-search-user";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { getUserSearch } from "services/user.svc";

const ModalSearchUser = ({ isOpen, onOpenChange }) => {
    const dispatch = useDispatch()

    const { onClose } = useDisclosure();

    const handleCloseModal = () => {
        onClose()
    }

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
            // onClose={handleCloseModal}
            radius="sm"
            size='5xl'
            backdrop='blur'
            stlye={{ height: '1000px' }}
            classNames={{
                base: "border-[#ffffff] bg-[#929292] dark:bg-black text-[#a8b0d3]",
            }}
        >
            <ModalContent>
                <div className='grid grid-cols-1 gap-2 w-full h-full overflow-auto'>
                    <SearchBlockDebounce
                        className='w-full'
                        onSubmit={handleSearchDebounce}
                    />

                    {
                        userSearch ?
                            <div className='w-full h-full'>
                                <ListSearchUser
                                    userSearch={userSearch.data}
                                />
                            </div>

                            : 'Chưa có ai hiện tại'
                    }
                </div>
            </ModalContent>
        </Modal>
    )
}

export default ModalSearchUser

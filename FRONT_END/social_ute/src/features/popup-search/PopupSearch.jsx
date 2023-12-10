import { Popover, PopoverContent, PopoverTrigger, Spinner, useDisclosure } from "@nextui-org/react";
import SearchBlockDebounce from "components/search-block-debounce";
import ListSearchUser from "features/list-search-user";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserSearch } from "services/user.svc";

const PopupSearch = ({ trigger }) => {
    const [searchParams, setSearchParams] = useSearchParams('')
    const [userSearch, setUserSearch] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const { onClose } = useDisclosure();

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

    const handleClosePopup = () => {
        setIsOpen(false)
    }

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
        <Popover
            placement="right"
            classNames={{
                content: [
                    "py-2 px-2 border text-white",
                    'bg-bg_popup_primary'
                ],
            }}
            radius='sm'
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            triggerType='grid'
        >

            <PopoverTrigger children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent
                className="w-[300px] h-[200px]"

            >
                <div className='grid grid-cols-1 gap-2 w-full h-full overflow-auto'>
                    <SearchBlockDebounce
                        className='w-full p-3'
                        onSubmit={handleSearchDebounce}
                    />

                    {
                        userSearch ?
                            <div className='w-full h-full'>
                                <ListSearchUser
                                    userSearch={userSearch.data}
                                    handleClosePopup={handleClosePopup}
                                />
                            </div>

                            : <Spinner color="default" size="lg" />
                    }
                </div>
            </PopoverContent>

        </Popover >
    )
}

export default PopupSearch

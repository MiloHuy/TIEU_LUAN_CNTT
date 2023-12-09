import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import SearchBlockDebounce from "components/search-block-debounce";

const PopupSearch = ({ trigger }) => {
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
        >

            <PopoverTrigger children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent className="w-[300px] h-[200px]">
                <div className='grid grid-cols-1 gap-2 items-start justify-start w-full h-full'>
                    <SearchBlockDebounce className='w-full p-3' />

                    <div>02</div>
                </div>
            </PopoverContent>

        </Popover >
    )
}

export default PopupSearch

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const PopupNofication = ({ trigger }) => {
    return (
        <Popover
            placement="right-end"
            showArrow={true}
            classNames={{
                content: [
                    "py-3 px-4 border text-white",
                    'bg-bg_popup_primary'
                ],
            }}
        >

            <PopoverTrigger children>
                {trigger}
            </PopoverTrigger>

            <PopoverContent className="w-[200px]">
                HandleNofication
            </PopoverContent>

        </Popover>
    )
}

export default PopupNofication

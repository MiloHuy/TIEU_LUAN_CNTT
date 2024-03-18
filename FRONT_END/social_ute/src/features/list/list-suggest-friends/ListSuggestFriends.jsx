import { Accordion, AccordionItem } from "@nextui-org/react";

const ListSuggestFriends = () => {
    return (
        <div className="w-full">
            <Accordion
                className='border dark:border-white border-black'
                itemClasses={{
                    base: "py-0 w-full ",
                    title: "font-normal text-md font-quick_sans",
                    indicator: "text-medium",
                    content: "text-small flex flex-col gap-2",
                }}
                variant="bordered"
            >
                <AccordionItem
                    key="1"
                    aria-label="Friends sugguest"
                    title="Danh sách bạn bè đề xuất"
                >
                    <p className='font-quick_sans text-sm text-black dark:text-white'>
                        Chưa có lời gợi ý kết bạn nào
                    </p>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default ListSuggestFriends

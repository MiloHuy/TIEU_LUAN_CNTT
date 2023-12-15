import { Accordion, AccordionItem } from "@nextui-org/react";
import CardFriendUser from "features/card/card-friend-user";

const ListSuggestFriends = () => {
    return (
        <div className="w-full">
            <Accordion
                className='border border-white'
                itemClasses={{
                    base: "py-0 w-full",
                    title: "font-normal text-sm",
                    indicator: "text-medium",
                    content: "text-small",
                }}
                variant="bordered"
            >
                <AccordionItem
                    key="1"
                    aria-label="Friends sugguest"
                    title="Danh sách bạn bè đề xuất"
                >
                    <CardFriendUser
                        friend=''
                    />
                    <CardFriendUser
                        friend=''
                    />
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default ListSuggestFriends

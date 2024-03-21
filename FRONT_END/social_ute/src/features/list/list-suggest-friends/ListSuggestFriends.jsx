import clsx from "clsx";
import CardUserActions from "combine/card-user-actions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/accordion";
import { Button } from "components/button";
import { UserPlus } from 'lucide-react';

const ListSuggestFriends = ({ suggestFriends }) => {
  return (
    <Accordion
      className={clsx(
        "border border-black rounded-lg px-2 font-quick_sans",
        "dark:text-white dark:border dark:border-white",
      )} type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className='hover:no-underline font-bold'>Danh sách bạn bè đề xuất</AccordionTrigger>
        <AccordionContent className='w-full'>
          <CardUserActions action={<Button variant='outline' className='px-2 font-quick_sans'><UserPlus size={20} strokeWidth={1} /></Button>} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ListSuggestFriends

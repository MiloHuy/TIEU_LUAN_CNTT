import clsx from "clsx";
import { Button } from "components/button";
import { BadgePlus, Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { genLabelsModalGroups } from "./utils";

const ContentModalGroup = ({ className }) => {
  const classBaseParagraph = 'font-quick_sans text-center text-black dark:text-white font-bold'
  const classBaseButton = 'min-w-[180px] min-h-[90px]'

  const labels = genLabelsModalGroups()
  const navigate = useNavigate()

  return (
    <div className={
      clsx(
        'absolute top-0 right-0 min-h-[45vh] min-w-[50vw] ',
        className
      )
    }>
      <div className="flex flex-col h-full justify-center gap-4 min-h-[45vh] min-w-[40vw]">
        <p className={`${classBaseParagraph} text-[30px]`}>
          {labels.title}
        </p>

        <div className='w-full flex gap-3 items-center justify-around'>
          <Button
            className={`${classBaseButton}`}
            variant='press'
            onClick={() => navigate('/welcome/create-group')}
          >
            <p className={`${classBaseParagraph} text-[20px]`}>
              {labels.createGroup}
            </p>
            <BadgePlus size={20} strokeWidth={1.5} />
          </Button>

          <Button
            className={`${classBaseButton}`}
            variant='press'
            onClick={() => navigate('/welcome/all-group')}
          >
            <p className={`${classBaseParagraph} text-[20px]`}>
              {labels.seeGroup}
            </p>
            <Eye size={20} strokeWidth={1.25} />
          </Button>
        </div>
      </div>
    </div >
  )
}

export default ContentModalGroup
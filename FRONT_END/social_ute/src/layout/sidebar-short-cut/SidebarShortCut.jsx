import clsx from "clsx"
import TooltipContentCombine from "combine/tooltip-content/TooltipContent"
import { Button } from "components/button"

const SidebarShortCut = ({ icons, className }) => {
  return (
    Array.isArray(icons)
    &&
    <div className={clsx('flex flex-col gap-3 items-start justify-start w-[5vw] h-full border', className)}>
      {
        icons.map((icon, index) => {
          return (
            <TooltipContentCombine
              key={index}
              title={icon.title}
              trigger={
                <Button className='w-[60px] bg-transparent' variant='ghost'>
                  {icon.icon}
                </Button>
              }
              side='top'
            />
          )
        })
      }
    </div>
  )
}

export default SidebarShortCut

import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/tooltip';

const TooltipContentCombine = ({ trigger, title, side = 'right', className, }, props) => {
  return (
    <TooltipProvider {...props}>
      <Tooltip>
        <TooltipTrigger>
          {trigger}
        </TooltipTrigger>
        <TooltipContent side={side} className={clsx('font-quick_sans text-sm font-bold', className)}>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipContentCombine

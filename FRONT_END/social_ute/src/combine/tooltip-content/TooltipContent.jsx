import clsx from 'clsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/tooltip';

const TooltipContentCombine = ({ trigger, title, side = 'right', className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {trigger}
        </TooltipTrigger>
        <TooltipContent side={side} className={clsx('font-quick_sans text-sm', className)}>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipContentCombine

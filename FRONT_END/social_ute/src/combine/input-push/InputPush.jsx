import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { Button } from "components/button";
import { TYPELOADING } from "constants/type.const";
import { CircleArrowUp } from 'lucide-react';
import { useMemo, useState } from "react";

const InputPush = ({ className, icon, placeholder, onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState()

  const handleChangeInput = (e) => {
    setInputValue(e.target.value)
  }

  const triggerButton = useMemo(() => {
    if (!inputValue) return;
    return <Button onClick={() => onSubmit(inputValue)}
      variant='ghost' className='hover:bg-white'>
      <CircleArrowUp size={20} color="#000000" strokeWidth={1.5} />
    </Button>
  }, [inputValue, onSubmit])

  return (
    <label
      className={clsx(
        'group',
        'flex items-center gap-2',
        'rounded-lg hover:cursor-pointer text-sm',
        'h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500',
        'focus-within:outline-none focus-within:ring-1 focus-within:ring-neutral-800',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-within:ring-neutral-300',
        className
      )}
      htmlFor='inputId'
    >
      {icon}

      <LoadingComponent type={TYPELOADING.SPINNER} condition={!isLoading}>
        <input
          id='inputId'
          value={inputValue}
          className="flex-1 focus-within:outline-none focus-within:ring-0 bg-transparent font-quick_sans"
          placeholder={placeholder}
          onChange={handleChangeInput}
        />

        {triggerButton}
      </LoadingComponent>
    </label>
  )
}

export default InputPush

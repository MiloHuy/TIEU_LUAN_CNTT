import clsx from "clsx";
import { useRef, useState } from "react";

const SearchBlockDebounce = (props) => {
    const { onSubmit } = props
    const [search, setSearch] = useState("")
    const typingTimeoutRef = useRef(null)

    const handlesearchChange = (e) => {
        const value = e.target.value
        setSearch(value)

        if (!onSubmit) return

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                search: value
            }

            onSubmit(formValues)
        }, 300)
    }

    return (
        <form className={clsx('relative border h-10 w-60 rounded-md border-black dark:border-white', props.className)}>
            <input
                type='text'
                value={search}
                size='sm'
                variant="bordered"
                onChange={handlesearchChange}
                placeholder="Nhập nội dung cần tìm kiếm."
                className='text-sm text-black dark:text-white h-full w-full rounded-md bg-transparent'
            />
        </form>
    )
}

export default SearchBlockDebounce

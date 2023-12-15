import { Input } from "@nextui-org/react";
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
        <form className={clsx('relative', props.className)}>
            <Input
                type='text'
                value={search}
                size='sm'
                variant="bordered"
                onChange={handlesearchChange}
                placeholder="Nhập nội dung cần tìm kiếm."
                className='text-sm text-white dark:text-white h-full'
            />
        </form>
    )
}

export default SearchBlockDebounce

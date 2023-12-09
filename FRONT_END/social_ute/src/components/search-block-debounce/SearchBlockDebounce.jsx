import { Input } from "@nextui-org/react";
import clsx from "clsx";
import { useRef, useState } from "react";

const SearchBlockDebounce = (props) => {
    const { onSubmit } = props
    const [searchTerm, setSearchTerm] = useState("")
    const typingTimeoutRef = useRef(null)

    const handleSearchTermChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        if (!onSubmit) return

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            }

            onSubmit(formValues)
        }, 500)
    }

    return (
        <form className={clsx('', props.className)}>
            <Input
                type='text'
                value={searchTerm}
                size='sm'
                variant="bordered"
                onChange={handleSearchTermChange}
                placeholder="Nhập nội dung cần tìm kiếm."
                className='text-sm text-white dark:text-white'
            />
        </form>
    )
}

export default SearchBlockDebounce

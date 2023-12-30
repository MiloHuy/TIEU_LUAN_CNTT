import clsx from "clsx";
import MyInput from "components/input/Input";
import { Search } from 'lucide-react';
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
        <form className={clsx('relative rounded-sm', props.className)}>
            <MyInput
                type='text'
                value={search}
                size='sm'
                onChange={handlesearchChange}
                placeholder="Nhập nội dung cần tìm kiếm."
                startContent={<Search size={20} strokeWidth={1} />}
                className='text-sm text-black h-full w-full  rounded-sm bg-transparent'
            />
        </form>
    )
}

export default SearchBlockDebounce

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "components/select"
import { MockListGroup } from "constants/group/group-list.const"
import ListGroupAttended from "features/list/list-group-attended"

const AllGroup = () => {
    return (
        <div className='w-full h-full p-3 flex flex-col gap-4 overflow-auto'>
            <h1 className="text-black dark:text-white font-quick_sans text-[40px]">
                Nhóm bạn đã tham gia
            </h1>

            <div className='flex w-full justify-between gap-2'>
                <h1 className="text-black dark:text-white font-quick_sans font-bold text-[20px]">
                    Tất cả các nhóm đã tham gia (20)
                </h1>

                <Select >
                    <SelectTrigger className='w-[100px] bg-white border border-black'>
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent className='text-black'>
                        <SelectGroup>
                            <SelectItem value='all-group' className='text-black'>
                                Tất cả
                            </SelectItem>
                            <SelectItem value='admin-group' className='text-black'>
                                Admin
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <ListGroupAttended
                groups={MockListGroup}
            />
        </div>
    )
}

export default AllGroup

import clsx from "clsx"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "components/select"
import { ESelectGroup } from "constants/group/enum"

export const ArraySelectGroup = [
  {
    value: ESelectGroup.ALL,
    label: 'Tất cả'
  },
  {
    value: ESelectGroup.ADMIN,
    label: 'Admin'
  },
  {
    value: ESelectGroup.SUPERADMIN,
    label: 'Super Admin'
  }
]

const SelectListGroup = ({ onChange, className, defaultValue }) => {
  const handleChangeSelect = (e) => {
    onChange && onChange(e)
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={handleChangeSelect}>
      <SelectTrigger className={clsx("w-[250px] bg-white border border-black font-quick_sans text-start", className)}>
        <SelectValue placeholder="Chọn danh sách theo" />
      </SelectTrigger>
      <SelectContent className='text-black'>
        <SelectGroup>
          {ArraySelectGroup.map((item, index) => (
            <SelectItem key={index} value={item.value} className='text-black'>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectListGroup

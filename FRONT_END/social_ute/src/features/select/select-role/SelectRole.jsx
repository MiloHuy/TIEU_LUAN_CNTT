import clsx from "clsx";
import {
  Select, SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/select";

const SelectRole = ({ options, handleChange, values, className, onSubmit }) => {

  const handleChangeSelect = (e) => {
    if (!onSubmit) return

    onSubmit && onSubmit(e)
  }

  return (
    <Select onValueChange={handleChangeSelect} defaultValue={values} id='role' name='role'>
      <SelectTrigger className={clsx('w-full h-full', className)}>
        <SelectValue placeholder="Chọn vai trò" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((label, i) => {
            return (
              <SelectItem
                key={i}
                className='text-md gap-1 border-b border-black'
                value={label.value}>
                <div className='flex items-center w-full justify-between gap-2'>
                  <p className='text-md font-quick_sans'>{label.label}</p>
                  {label.icon}
                </div>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectRole

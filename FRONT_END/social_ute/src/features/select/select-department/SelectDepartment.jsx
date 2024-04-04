import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import {
  Select, SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/select";
import { TYPELOADING } from "constants/type.const";

const SelectDepartment = ({ departments, handleChange, className, isLoading }) => {
  const handleChangeSelect = (e) => {
    handleChange((prev) => ({
      ...prev,
      department: e
    }))
  }

  return (
    <Select onValueChange={handleChangeSelect} id='department' name='department'>
      <SelectTrigger className={clsx('w-full h-full', className)}>
        <SelectValue placeholder="Chọn phòng ban/khoa" />
      </SelectTrigger>
      <SelectContent className='font-quick_sans text-md'>
        <SelectGroup>
          {
            isLoading ?
              <LoadingComponent type={TYPELOADING.TITLE} title='Đang lấy dữ liệu' condition={!isLoading}>
                {
                  departments && departments.map((department, i) => {
                    return (
                      <SelectItem
                        key={i}
                        className='gap-1 border-b border-black'
                        value={department.name}>
                        <p>{department.name}</p>
                      </SelectItem>
                    )
                  })
                }
              </LoadingComponent>
              :
              <p>Vui lòng chọn vai trò của bạn.</p>
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectDepartment

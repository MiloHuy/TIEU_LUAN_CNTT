import clsx from "clsx";
import {
  Select, SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/select";
import { Earth, LockKeyhole, User } from "lucide-react";

export const PrivacyPost = {
  ALONE: 0,
  FOLLOWER: 1,
  EVERYONE: 2,
};

export const PrivacyPostLabel = {
  ALONE: 'Chỉ mình tôi',
  FOLLOWER: 'Người theo dõi',
  EVERYONE: 'Mọi người',
}

export const genOptionsPrivacyPost = () => {
  return [
    {
      value: PrivacyPost.ALONE,
      label: PrivacyPostLabel.ALONE,
      icon: <LockKeyhole size={16} strokeWidth={1.25} />
    },
    {
      value: PrivacyPost.FOLLOWER,
      label: PrivacyPostLabel.FOLLOWER,
      icon: <User size={20} strokeWidth={1.25} />
    },
    {
      value: PrivacyPost.EVERYONE,
      label: PrivacyPostLabel.EVERYONE,
      icon: <Earth size={20} strokeWidth={1.25} />
    }
  ]
}

const SelectPrivacyPost = ({ loading, className, title, handleChange, values }) => {
  const options = genOptionsPrivacyPost()

  const handleChangeSelect = (e) => {
    handleChange((prev) => ({
      ...prev,
      privacy: e
    }))
  }
  return (
    <div className={clsx('grid grid-cols-3 items-center justify-between w-full', className)}>
      <p className='text-md'>{title ? title : 'Hãy chọn phạm vi'}</p>

      <Select onValueChange={handleChangeSelect} defaultValue={values} disabled={loading} id='privacy' name='privacy'>
        <SelectTrigger className='col-span-2'>
          <SelectValue placeholder="Chọn phạm vi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((label, i) => {
              return (
                <SelectItem
                  key={i}
                  className='text-sm gap-1 border-b border-black'
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
    </div >
  )
}

export default SelectPrivacyPost

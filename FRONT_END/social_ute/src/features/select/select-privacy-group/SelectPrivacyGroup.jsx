import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'components/select';
import { EPrivacyGroup } from 'constants/group/enum';

export const OptionsPrivacyGroup = [
  {
    label: "Công khai (mặc định)",
    value: EPrivacyGroup.PUBLIC.toString(),
  },
  {
    label: "Riêng tư",
    value: EPrivacyGroup.PRIVATE.toString(),
  },
];

const SelectPrivacyGroup = ({ field, form, isLoading }) => {

  return (
    <Select
      id='privacyGroup'
      name='privacyGroup'
      className='h-[90px]'
      onValueChange={(value) => form.setFieldValue(field.name, value)}
      disabled={isLoading}
    >
      <SelectTrigger className="text-md w-[30vw] min-h-[70px]">
        <SelectValue
          placeholder="Quyền riêng tư"
        />
      </SelectTrigger>

      <SelectContent className='h-[15vh] text-white rounded-[15px] bg-black/50'>
        <SelectGroup>
          {
            OptionsPrivacyGroup.map((option) => {
              return (
                <SelectItem
                  className='rounded-[10px] text-md'
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              )
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select >
  )
}

export default SelectPrivacyGroup

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'components/select';
import { OptionsPrivacyGroup } from 'constants/group/group-options-scope.const';

const SelectPrivacyGroup = ({ field, form }) => {

  return (
    <Select
      id='privacyGroup'
      name='privacyGroup'
      className='h-[90px]'
      onValueChange={(value) => form.setFieldValue(field.name, value)}
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
            }
            )
          }
        </SelectGroup>
      </SelectContent>
    </Select >
  )
}

export default SelectPrivacyGroup

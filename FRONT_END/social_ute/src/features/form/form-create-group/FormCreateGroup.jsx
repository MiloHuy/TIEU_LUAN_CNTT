import { Button } from 'components/button';
import Input from 'components/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'components/select';
import { OptionsScopeGroup } from 'constants/group/group-options-scope.const';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { object, string } from "yup";

const FormCreateGroup = () => {
    const [items, setItem] = useState(null)
    const initFormCreateGroup = {
        name_group: null,
        scope_group: items,
    }

    const [formCreateGroup, setFormCreateGroup] = useState(initFormCreateGroup)

    const handleInputChange = (e) => {
        setFormCreateGroup({
            ...formCreateGroup,
            name_group: [e.target.value],
            scope_group: items
        })

        values['scope_group'] = items
    }

    const handleChangeSelection = (e) => {
        setItem(e)
    }

    const handleCreateGroup = (e) => {
        values['scope_group'] = items
        console.log('values of formik: ' + Object.entries(values))
    }

    const FormCreateGroupSchema = useMemo(() => {
        return object().shape({
            name_group: string(),
            scope_group: string(),
        })
    }, [])

    const formik = useFormik({
        initialValues: initFormCreateGroup,
        validationSchema: FormCreateGroupSchema,
        handleChange: { handleInputChange, handleChangeSelection },
        handleSubmit: { handleCreateGroup },
        onSubmit: { handleCreateGroup }
    })
    const { values, errors } = formik

    return (
        <form
            className='h-[60vh] w-full flex flex-col gap-6 items-center justify-center'
            onSubmit={formik.handleSubmit}
        >
            <Input
                className='max-w-[30vw]'
                radius='lg'
                size='lg'
                placeholder='Tên nhóm'
                name='name_group'
                type='text'

                onChange={formik.handleChange}
            />

            <Select
                name='scope_group'
                className='h-[90px]'
                id='scope_group'

                onValueChange={handleChangeSelection}
            >
                <SelectTrigger className="text-md w-[30vw] h-[10vh] rounded-[15px]">
                    <SelectValue
                        placeholder="Quyền riêng tư"
                    />
                </SelectTrigger>

                <SelectContent className='h-[15vh] text-white  rounded-[15px] bg-black/50'>
                    <SelectGroup
                        className='h-full grid grid-cols-1 justify-start items-center'
                    >
                        {
                            OptionsScopeGroup.map((option) => {
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
            </Select>

            <div className='w-[30vw] flex justify-end'>
                <Button
                    className='p-4 border'
                    variant='secondary'
                    type="submit"

                    onClick={handleCreateGroup}
                >
                    Tạo nhóm
                </Button>
            </div>
        </form >
    )
}

export default FormCreateGroup

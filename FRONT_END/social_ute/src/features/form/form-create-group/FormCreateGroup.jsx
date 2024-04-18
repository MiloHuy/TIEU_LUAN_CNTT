import { Button } from 'components/button';
import { InputV2 } from 'components/input-v2';
import { Textarea } from 'components/textarea';
import { EPrivacyGroup } from 'constants/group/enum-privacy';
import SelectPrivacyGroup from 'features/select/select-privacy-group';
import { FastField, FieldArray, Form, Formik } from 'formik';
import { schemaFormCreateGroup } from './schema';

const FormCreateGroup = ({ onChangeForm, onSubmitForm }) => {
  const initFormCreateGroup = {
    nameGroup: null,
    privacyGroup: EPrivacyGroup.PUBLIC,
    regulationGroup: []
  }

  const schema = schemaFormCreateGroup()

  const handleChangeForm = (values) => {
    onChangeForm && onChangeForm((prev) => ({ ...prev, ...values }))
  }

  return (
    <Formik
      initialValues={initFormCreateGroup}
      // validationSchema={schema}
      handleChange={handleChangeForm}
      onSubmit={async (values) => {
        console.log('values', values)
        onSubmitForm && onSubmitForm(values)
      }}
    >
      {({ values }) => (
        <Form
          className='min-w-max flex flex-col h-[70vh] gap-6 font-quick_sans overflow-auto p-4 no-scrollbar'
        >
          <FastField name='nameGroup'>
            {({ field }) => (
              <InputV2
                className='max-w-[30vw] min-h-[70px] bg-transparent border border-black'
                radius='lg'
                size='lg'
                placeholder='Tên nhóm'
                name='name_group'
                type='text'
                {...field}
              />
            )}
          </FastField>

          <FastField name='privacyGroup' component={SelectPrivacyGroup} />

          <p className='text-start'>Điều khoản của nhóm :</p>

          <FieldArray name='regulationGroup'>
            {({ push, remove }) => (
              <div className='flex flex-col items-start justify-start w-[30vw] gap-2'>
                {values.regulationGroup.length > 0 &&
                  values.regulationGroup.map((regulation, index) => (
                    <FastField name={`regulationGroup[${index}]`}>
                      {({ field }) => (
                        <div className='grid gap-2 w-full'>
                          <label>Điều khoản : {index + 1}</label>
                          <Textarea {...field} className='border border-black dark:border-white' />
                          <Button onClick={(e) => { e.preventDefault(); remove(index) }}>
                            Xóa
                          </Button>
                        </div>
                      )}
                    </FastField>
                  ))}
                <Button className='p-2' onClick={(e) => { e.preventDefault(); push('') }}>Thêm nội quy</Button>
              </div>
            )}
          </FieldArray>

          <div className='w-[30vw] flex justify-end'>
            <Button
              className='p-4 border'
              variant='secondary'
              type="submit"
            >
              Tạo nhóm
            </Button>
          </div>
        </Form >
      )}
    </Formik >
  )
}

export default FormCreateGroup

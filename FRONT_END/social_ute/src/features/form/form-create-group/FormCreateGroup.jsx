import { Button } from 'components/button';
import { InputV2 } from 'components/input-v2';
import { EPrivacyGroup } from 'constants/group/enum';
import SelectPrivacyGroup from 'features/select/select-privacy-group';
import { ErrorMessage, FastField, Form, Formik } from 'formik';
import { useCallback } from 'react';
import FieldRegulations from './FieldRegulations';
import { schemaFormCreateGroup } from './schema';

const FormCreateGroup = ({ onChangeForm, onSubmitForm, isLoading }) => {
  const initFormCreateGroup = {
    nameGroup: null,
    privacyGroup: EPrivacyGroup.PUBLIC,
    regulationGroup: []
  }

  const schema = schemaFormCreateGroup()

  const handleChangeForm = useCallback((values) => {
    onChangeForm && onChangeForm((prev) => ({ ...prev, ...values }))
  }, [onChangeForm]);

  return (
    <Formik
      initialValues={initFormCreateGroup}
      validationSchema={schema}
      handleChange={handleChangeForm}
      onSubmit={async (values) => {
        onSubmitForm && onSubmitForm(values)
      }}
    >
      {({ values, errors }) => (
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
                type='text'
                disabled={isLoading}
                {...field}
              />
            )}
          </FastField>

          <ErrorMessage name="nameGroup" render={(msg) => <p className='text-red'>{msg}</p>} />

          <FastField name='privacyGroup' >
            {({ field, form }) => (<SelectPrivacyGroup field={field} form={form} isLoading={isLoading} />)}
          </FastField>

          <p className='text-start'>Điều khoản của nhóm :</p>

          <FieldRegulations values={values} isLoading={isLoading} />

          <div className='w-[30vw] flex justify-end'>
            <Button
              className='p-4 border'
              variant='secondary'
              type="submit"
              disabled={isLoading}
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

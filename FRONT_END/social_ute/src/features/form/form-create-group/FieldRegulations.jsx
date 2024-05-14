import { Button } from 'components/button';
import { Textarea } from 'components/textarea';
import { FastField, FieldArray } from 'formik';

const FieldRegulations = ({ values, isLoading }) => {
  return (
    <FieldArray name='regulationGroup' disabled={isLoading}>
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
  )
}

export default FieldRegulations

import ActionsGroup from "./ActionsGroup"

const InfoBaseGroup = () => {
  return (
    <div className='flex flex-col w-full h-max border-b border-black gap-2 px-2 rounded-md dark:border-white'>
      <h1 className='text-[30px] font-bold uppercase'>Tiểu luận chuyên ngành</h1>

      <div className='grid grid-cols-2 w-full'>
        <div className='grid gap-2 border-r border-black dark:border-white min-h-[100px]'>
          <h4 className='text-lg'>Nhóm công khai</h4>

          <h4 className='text-lg'>100 thành viên</h4>
        </div>

        <ActionsGroup />
      </div>
    </div>
  )
}

export default InfoBaseGroup

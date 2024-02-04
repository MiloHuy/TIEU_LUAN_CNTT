import FormCreateGroup from 'features/form/form-create-group';
import { Camera } from 'lucide-react';

const CreateGroup = () => {
    return (
        <div className='flex flex-col w-full h-auto gap-2'>
            <div className='h-[25vh] border-b border-black dark:border-white'>
                {/* <UploadBgGroup /> */}
                <div className='flex gap-2 h-full items-center justify-center'>
                    <Camera size={30} strokeWidth={1.25} />
                    <p className='text-black dark:text-white font-quick_sans text-2xl font-bold'>
                        Chọn ảnh đại diện của nhóm
                    </p>
                </div>
            </div>

            <FormCreateGroup />
        </div>
    )
}

export default CreateGroup

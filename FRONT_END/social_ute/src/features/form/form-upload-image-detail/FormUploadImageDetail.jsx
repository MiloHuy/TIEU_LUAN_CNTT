import { Camera } from 'lucide-react';

const FormUploadImageDetail = () => {
    return (
        <div className="grid grid-rows-2 gap-2 items-center">
            <div className='w-full h-full flex justify-center'>
                <Camera size={40} color='#857a7a' strokeWidth={0.75} />
            </div>

            <p className='dark:text-white font-noto'>
                Hãy chia sẻ bức ảnh đầu tiên của bạn nào.
            </p>
        </div>
    )
}

export default FormUploadImageDetail

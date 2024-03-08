import { Button } from "components/button";
import { ImageIcon, VideoIcon } from "components/icon/bonus.icon";
import { Camera } from 'lucide-react';

const FormSelectImageOrVideo = () => {
    return (
        <div className="flex flex-col h-full justify-center gap-4">
            <p className='font-quick_sans text-[30px] text-center text-black dark:text-white font-bold h-max'>
                Bạn muốn đăng tải điều gì?
            </p>

            <div className='w-full flex gap-3 items-center justify-around'>
                <Button variant='press'>
                    <p className='font-quick_sans text-[20px] text-center text-black dark:text-white font-bold'>
                        Bài viết
                    </p>
                    <div className='flex items-center justify-center w-full'>
                        <ImageIcon
                            height='25'
                            width='25'
                        />

                        <VideoIcon
                            height='25'
                            width='25'
                        />
                    </div>
                </Button>

                <Button variant='press'>
                    <p className='font-quick_sans text-[20px] text-center text-black dark:text-white font-bold'>
                        Tin
                    </p>

                    <Camera strokeWidth={0.75} />
                </Button>
            </div>
        </div>
    )
}

export default FormSelectImageOrVideo

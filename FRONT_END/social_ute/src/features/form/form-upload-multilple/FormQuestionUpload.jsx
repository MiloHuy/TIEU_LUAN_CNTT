import { ImageUpload } from "components/icon/bonus.icon"

const FormQuestionUpload = () => {
    return (
        <div className='flex flex-col gap-6 justify-center items-center'>
            <p className='font-quick_sans text-[30px] text-center text-black dark:text-white font-bold'>
                Hãy chọn ảnh hoặc video bạn muốn
            </p>

            <label
                for="post_img"
                className='w-max h-max border flex flex-col items-center justify-center cursor-pointer'
            >
                <ImageUpload
                    height='37'
                    width='61'
                />

                <input
                    id="post_img"
                    type="file"
                    className="hidden"
                    accept="image/*"
                />
            </label>
        </div>
    )
}

export default FormQuestionUpload

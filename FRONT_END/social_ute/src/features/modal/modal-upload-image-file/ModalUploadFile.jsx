import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import FormQuestionUpload from "features/form/form-upload-multilple/FormQuestionUpload";
import FormSelectImageOrVideo from "features/form/form-upload-multilple/FormSelectImageOrVideo";

const ModalUploadFile = ({ trigger }) => {
    const multipleForm = [
        <FormQuestionUpload />,
        <FormSelectImageOrVideo />
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className='h-[45vh] w-[50vw] sm:rounded-[20px] transform duration-500 ease-in overflow-hidden'>

            </DialogContent>
        </Dialog >
    )
}

export default ModalUploadFile

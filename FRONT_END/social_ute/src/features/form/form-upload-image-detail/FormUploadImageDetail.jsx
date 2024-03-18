import { useDisclosure } from '@nextui-org/react';
import ModalUploadImageFile from 'features/modal/modal-upload-image-file';
import { Camera } from 'lucide-react';
import { useState } from 'react';

const FormUploadImageDetail = () => {
    const [openModal, setOpenModal] = useState({
        modal_file: false,
    })
    const { onOpen, onClose } = useDisclosure();

    const handleOpenModal = () => {
        if (openModal.modal_file === true) {
            onOpen()
        }
    }

    const handleOpenModelCreate02 = () => {
        setOpenModal((prev) => ({
            ...prev,
            modal_file: true
        }))
    }

    const handleCloseModal = () => {
        if (openModal.modal_file === true) {
            setOpenModal((prev) => ({
                ...prev,
                modal_file: false
            }))
            onClose()
        }
    }

    return (
        <div className="grid grid-rows-2 gap-2 items-center w-full justify-center">
            <div className='w-full h-full flex justify-center'>
                <div
                    className='w-full flex justify-center gap-6 cursor-pointer'
                // color="default"
                // variant="light"
                // onClick={handleOpenModelCreate02}
                >
                    <Camera
                        size={40}
                        color='#857a7a'
                        strokeWidth={0.75}
                        onClick={handleOpenModelCreate02} />
                </div>

                <ModalUploadImageFile
                    isOpen={openModal.modal_file}
                    onOpenChange={handleOpenModal}
                    onClose={handleCloseModal}
                />

            </div>

            <p className='dark:text-white font-quick_sans text-black'>
                Hãy chia sẻ bức ảnh đầu tiên của bạn nào.
            </p>
        </div>
    )
}

export default FormUploadImageDetail

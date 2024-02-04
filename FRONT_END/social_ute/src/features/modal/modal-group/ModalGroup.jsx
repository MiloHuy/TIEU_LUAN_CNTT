import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import { LayoutList, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModalGroup = ({ trigger }) => {
    const navigate = useNavigate()

    const handleNavigateGroup = (link) => {
        if (!link) return;

        navigate(link)
        // window.location.reload()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent
                hideCloseButton={false}
                className='w-[40vw] bg-bg_popup_secondary'>
                <div className="relative grid grid-cols-2 gap-4 justify-center w-full items-center h-[20vh]">
                    <div
                        className="flex h-full gap-4 items-center justify-center border border-black rounded-md"
                        onClick={() => handleNavigateGroup('/welcome/create-group')}
                    >
                        <PlusCircle
                            size={20}
                            strokeWidth={1.5} />

                        <p className='text-lg font-nunito_sans text-black font-bold cursor-pointer'>
                            TẠO NHÓM MỚI
                        </p>
                    </div>

                    <div
                        className="flex h-full gap-4 items-center justify-center border border-black rounded-md cursor-pointer"
                        onClick={() => handleNavigateGroup('/welcome/all-group')}
                    >
                        <LayoutList
                            size={20}
                            strokeWidth={1.5} />

                        <p className='text-lg font-nunito_sans text-black font-bold'>
                            DANH SÁCH NHÓM
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalGroup

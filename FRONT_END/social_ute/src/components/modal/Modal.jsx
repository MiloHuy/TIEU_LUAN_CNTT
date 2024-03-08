import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ content, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <>
            <div className="modal-overlay fixed top-0 left-0 hidden w-full h-full bg-black bg-opacity-75 transition-opacity" data-te-backdrop="static" tabindex="-1" aria-hidden="true">
                <div className="modal-container relative w-auto pointer-events-none">
                    <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800">{content.title}</h5>
                            <button className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" onClick={onClose} data-te-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <p>{content.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("modal-root")
    );
};

export default Modal;

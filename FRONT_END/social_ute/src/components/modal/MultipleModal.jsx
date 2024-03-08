// import { useState } from 'react'
// import Modal from 'react-modal'

// const MultipleModal = () => {
//     const [currentModal, setCurrentModal] = useState(1)
//     const modals = [
//         { id: 1, title: 'Modal 1', content: 'This is the content of Modal 1.' },
//         { id: 2, title: 'Modal 2', content: 'This is the content of Modal 2.' },
//         { id: 3, title: 'Modal 3', content: 'This is the content of Modal 3.' }
//     ]

//     const prevModal = () => {
//         setCurrentModal(currentModal - 1)
//         if (currentModal === 1) setCurrentModal(modals.length)
//     }

//     const nextModal = () => {
//         setCurrentModal(currentModal + 1)
//         if (currentModal === modals.length) setCurrentModal(1)
//     }

//     const showModal = (id) => {
//         setCurrentModal(id)
//     }

//     const hideModal = () => {
//         setCurrentModal(1)
//     }

//     return (
//         <div className="container mx-auto">
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => showModal(1)}
//             >
//                 Open Modal 1
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={prevModal}
//                 disabled={currentModal === 1}
//             >
//                 Previous
//             </button>
//             <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={nextModal}
//                 disabled={currentModal === modals.length}
//             >
//                 Next
//             </button>

//             {
//                 modals.map((modal) => (
//                     <Modal
//                         key={modal.id}
//                         isOpen={currentModal === modal.id}
//                         onRequestClose={hideModal}
//                         contentLabel={modal.title}
//                     >
//                         <h2 className="text-xl font-bold mb-4">
//                             {modal.title}
//                         </h2>
//                         <p>{modal.content}</p>
//                     </Modal>
//                 ))
//             }
//         </div>
//     )
// }

// export default MultipleModal
import { useState } from "react";

const MultipleModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModal, setSelectedModal] = useState(null);

    const modals = [
        { title: "Modal 1", text: "Content for modal 1" },
        { title: "Modal 2", text: "Content for modal 2" },
        // Add more modals as needed
    ];

    const openModal = (index) => {
        setSelectedModal(modals[index]);
        setIsOpen(true);
    };

    return (
        <div>
            {
                modals.map((modal, index) => (
                    <button
                        key={index}
                        onClick={() => openModal(index)}
                        className="inline-block rounded bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-[0_8]"
                    />
                ))
            }
        </div >
    )
}

export default MultipleModal

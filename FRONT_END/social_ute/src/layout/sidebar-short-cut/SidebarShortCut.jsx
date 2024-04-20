import { useDisclosure } from '@nextui-org/react';
import clsx from "clsx";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genTriggerSidebar } from './utils';

const SidebarShortCut = ({ icons, className, userID }) => {
  const { onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState({
    modal_search: false,
    modal_file: false,
  })
  const dispatch = useDispatch()

  return (
    Array.isArray(icons)
    &&
    <div className={clsx('flex flex-col gap-3 items-center justify-start w-[5vw] h-full border', className)}>
      {icons.map((icon, index) => {
        return genTriggerSidebar(icon, index, userID, onOpen, onClose, navigate, openModal, setOpenModal, dispatch)
      })}
    </div>
  )
}

export default SidebarShortCut

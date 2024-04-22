import { useDisclosure } from '@nextui-org/react';
import clsx from "clsx";
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genTriggerSidebar } from './utils';

const SidebarShortCut = ({ icons, className, userID }) => {
  const { onClose } = useDisclosure();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState({
    modal_search: false,
    modal_file: false,
  })
  const dispatch = useDispatch()

  const itemsSideBar = useMemo(() => {
    return icons.map((icon, index) => {
      return genTriggerSidebar(icon, index, userID, onClose, navigate, openModal, setOpenModal, dispatch)
    })
  }, [icons])

  return (
    Array.isArray(icons)
    &&
    <div className={clsx('flex flex-col gap-3 items-center justify-start w-[5vw] h-full border', className)}>
      {itemsSideBar}
    </div>
  )
}

export default SidebarShortCut

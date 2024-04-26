import clsx from "clsx";
import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { genTriggerSidebar } from './utils';

const SidebarShortCut = ({ icons, className, userID }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const itemsSideBar = useMemo(() => {
    return icons.map((icon, index) => {
      return genTriggerSidebar(icon, index, userID, navigate, dispatch)
    })
  }, [icons, userID, navigate, dispatch])

  return (
    Array.isArray(icons)
    &&
    <div className={clsx('flex flex-col gap-3 items-center justify-start w-[5vw] h-full border', className)}>
      {itemsSideBar}
    </div>
  )
}

export default SidebarShortCut

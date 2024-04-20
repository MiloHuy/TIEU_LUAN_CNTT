import { useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import { Button } from 'components/button';
import { MessIcon, Users } from 'components/icon/bonus.icon';
import { Toggle } from 'components/toggle';
import ModalGroup from 'features/modal/modal-group';
import ModalSearchUser from 'features/modal/modal-search-user';
import ModalUploadFile from 'features/modal/modal-upload-image-file';
import PopupNofication from 'features/popup/popup-nofication';
import { Bell, Home, LogOut, PlusSquare, Search, UserCircle2, UserPlus } from "lucide-react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleCloseModal, handleLogOut, handleNavigateHome, handleNavigateRequest, handleNavigateUser, handleOpenModal, handleOpenModelSearch } from './utils';

const SidebarBody = (props) => {
  const { className, userID } = props
  const { onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState({
    modal_search: false,
    modal_file: false,
  })
  const dispatch = useDispatch()

  const classBaseButton = 'w-full flex justify-start gap-3 items-center px-4 border hover:scale-105'

  return (
    <div className={clsx('w-full h-max', className)}>
      <div className='flex flex-col gap-3 justify-between'>
        <Toggle
          className={classBaseButton}
          variant="ghost"

          onClick={() => handleNavigateHome(navigate)}
        >
          <Home
            size={24}
            strokeWidth={1.5}
          />

          <p className='font-quick_sans text-lg '>
            Trang chủ
          </p>
        </Toggle>

        <Button
          className={classBaseButton}
          variant="ghost"

          onClick={() => handleOpenModelSearch(setOpenModal)}
        >
          <Search
            size={24}
            strokeWidth={1.5}
          />

          <p className='font-quick_sans text-lg '>
            Tìm kiếm
          </p>
        </Button>

        <ModalSearchUser
          isOpen={openModal.modal_search}

          onOpenChange={() => handleOpenModal(openModal, onOpen)}
          onCloseModal={() => handleCloseModal(openModal, setOpenModal, onClose)}
        />

        <Button
          className={classBaseButton}
          variant="ghost"
        >
          <MessIcon
            height={24}
            width={24}
          />

          <p className='font-quick_sans text-lg'>
            Tin nhắn
          </p>
        </Button>

        <PopupNofication
          trigger={
            <Button
              className={classBaseButton}
              variant="ghost"
            >
              <Bell
                size={24}
                strokeWidth={1.5}
              />

              <p className='font-quick_sans text-lg '>
                Thông báo
              </p>
            </Button>
          }
        />

        <Button
          className={classBaseButton}
          variant="ghost"

          onClick={() => handleNavigateUser(navigate, userID)}
        >
          <UserCircle2
            size={24}
            strokeWidth={1.5}
          />

          <p className='font-quick_sans text-lg '>
            Trang cá nhân
          </p>
        </Button>

        <ModalGroup
          trigger={
            <Button
              className={classBaseButton}
              variant="ghost"
            >
              <Users height={20} width={20} />
              <p className='font-quick_sans text-lg '>
                Nhóm
              </p>
            </Button>
          }
        />

        <Button
          className={classBaseButton}
          variant="ghost"
          onClick={() => handleNavigateRequest(navigate)}
        >
          <UserPlus
            size={24}
            strokeWidth={1.5}
          />

          <p className='font-quick_sans text-lg '>
            Yêu cầu
          </p>
        </Button>

        <ModalUploadFile
          trigger={
            <Button
              className={classBaseButton}
              variant="ghost"
            >
              <PlusSquare
                size={24}
                strokeWidth={1.5}
              />

              <p className='font-quick_sans text-lg '>
                Tạo
              </p>
            </Button>
          }
        />

        <Button
          className={classBaseButton}
          variant="ghost"

          onClick={() => handleLogOut(dispatch, navigate)}
        >
          <LogOut
            size={24}
            strokeWidth={1.5}
          />

          <p className='font-quick_sans text-lg '>
            Đăng xuất
          </p>
        </Button>

      </div>
    </div >
  )
}

export default SidebarBody

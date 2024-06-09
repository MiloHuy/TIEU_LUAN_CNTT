import clsx from 'clsx';
import { Button } from 'components/button';
import { MessIcon, Users } from 'components/icon/bonus.icon';
import ModalGroup from 'features/modal/modal-group/ModalGroup';
import ModalSearchUser from 'features/modal/modal-search-user/ModalSearchUser';
import ModalUploadFile from 'features/modal/modal-upload-image-file/ModalUploadFile';
import popupNofication from 'features/popup/popup-nofication';
import { Bell, Home, LogOut, PlusSquare, Search, UserCircle2, UserPlus } from "lucide-react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogOut, handleNavigateHome, handleNavigateRequest, handleNavigateUser } from './utils';

const SidebarButton = ({ className, Icon, text, onClick }) => (
  <Button
    className={className}
    variant="ghost"
    onClick={onClick}
  >
    <Icon size={24} strokeWidth={1.5} />
    <p className='font-quick_sans text-lg'>{text}</p>
  </Button>
);

const SidebarBody = (props) => {
  const { className, userID } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classBaseButton = 'w-full flex justify-start gap-3 items-center px-4 border hover:scale-105';

  const buttons = [
    {
      Icon: Home,
      text: 'Trang chủ',
      onClick: () => handleNavigateHome(navigate),
      isModal: false
    },
    {
      Icon: Search,
      text: 'Tìm kiếm',
      onClick: null,
      isModal: true,
      ModalComponent: ModalSearchUser,
      modalProps: { className: 'w-[55vw] h-[70vh]' }
    },
    {
      Icon: MessIcon,
      text: 'Tin nhắn',
      onClick: null,
      isModal: false
    },
    {
      Icon: Bell,
      text: 'Thông báo',
      onClick: null,
      isModal: true,
      ModalComponent: popupNofication,
      modalProps: {}
    },
    {
      Icon: UserCircle2,
      text: 'Trang cá nhân',
      onClick: () => handleNavigateUser(navigate, userID),
      isModal: false
    },
    {
      Icon: Users,
      text: 'Nhóm',
      onClick: null,
      isModal: true,
      ModalComponent: ModalGroup,
      modalProps: {}
    },
    {
      Icon: UserPlus,
      text: 'Yêu cầu',
      onClick: () => handleNavigateRequest(navigate),
      isModal: false
    },
    {
      Icon: PlusSquare,
      text: 'Tạo',
      onClick: null,
      isModal: true,
      ModalComponent: ModalUploadFile,
      modalProps: {}
    },
    {
      Icon: LogOut,
      text: 'Đăng xuất',
      onClick: () => handleLogOut(dispatch, navigate),
      isModal: false
    },
  ];

  return (
    <div className={clsx('w-full h-max', className)}>
      <div className='flex flex-col gap-3 justify-between'>
        {buttons.map((button, index) => (
          button.isModal ?
            <button.ModalComponent key={index} {...button.modalProps} trigger={<SidebarButton className={classBaseButton} Icon={button.Icon} text={button.text} />} />
            :
            <SidebarButton key={index} className={classBaseButton} Icon={button.Icon} text={button.text} onClick={button.onClick} />
        ))}
      </div>
    </div>
  );
};

export default SidebarBody;

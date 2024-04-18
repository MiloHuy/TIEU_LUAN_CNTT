import { EPrivacyGroup } from 'constants/group/enum-privacy';
import FormCreateGroup from 'features/form/form-create-group';
import ModalUploadAvatarGroup from 'features/modal/modal-upload-avatar-group';
import { Camera } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { createGroup } from 'services/group/api-post.svc';

const CreateGroup = () => {
  const [formCreate, setFormCreate] = useState({
    nameGroup: '',
    regulationGroup: '',
    groupAvatar: '',
    privacyGroup: EPrivacyGroup.PUBLIC,
  })

  const triggerModalUploadAvatar = useMemo(() => {
    return (
      <div className='flex gap-2 h-full items-center justify-center cursor-pointer'>
        <Camera size={30} strokeWidth={1.25} />
        <p className='text-black dark:text-white font-quick_sans text-2xl font-bold'>
          Chọn ảnh đại diện của nhóm
        </p>
      </div>
    )
  }, [])

  const handleCreateGroup = async (values) => {
    try {
      const formData = new FormData()

      formData.append('name', values.nameGroup)
      formData.append('privacy', values.privacyGroup)
      formData.append('group_avatar', formCreate.groupAvatar)

      values.regulationGroup.forEach((item, index) => {
        formData.append(`regulation[${index}]`, item)
      })

      await createGroup(formData)

      toast.success('Tạo nhóm thành công', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => { window.location.reload() }, 2000)
    }
    catch {
      toast.error('Tạo nhóm thất bại', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='h-[25vh] w-full border-b border-black dark:border-white '>
        <ModalUploadAvatarGroup
          title='Chọn ảnh đại diện của nhóm'
          trigger={triggerModalUploadAvatar}
          titleButton='Chọn ảnh'
          onChangeAvatar={setFormCreate}
        />
      </div>

      <FormCreateGroup onChangeForm={setFormCreate} onSubmitForm={handleCreateGroup} />
    </div>
  )
}

export default CreateGroup

import { selectCurrenUser } from "app/slice/auth/auth.slice"
import { selectRolePermission } from "app/slice/group/group.slice"
import clsx from "clsx"
import { ERR_CREATE_POST } from "constants/error.const"
import { EMessGroup } from "constants/group/enum"
import { TOAST_OPTION_DEFAULT } from "constants/toast.const"
import ListPostGroup from "features/list/list-post-group"
import ModalUploadFile from "features/modal/modal-upload-image-file/ModalUploadFile"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { createPostGroup } from "services/post/api-post.svc"
import { checkPermissionMethod } from "utils/auth.utils"
import { errorHandler } from "utils/error-response.utils"
import { handleRevokeBlobUrl } from "utils/file.utils"

const TabContentPosts = () => {
  const user = useSelector(selectCurrenUser)
  const rolePermission = useSelector(selectRolePermission)
  const { permission, role } = rolePermission
  const { groupId } = useParams()

  const handleCreatePostGroup = async (values, files, images) => {
    try {
      const url = checkPermissionMethod(permission, { action: "createPost", role });

      if (!url) return toast.error(EMessGroup.DONT_HAVE_PERMISSION, TOAST_OPTION_DEFAULT);

      const formData = new FormData();
      formData.append("post_description", values["post_description"]);
      for (const file of files) {
        formData.append("post_img", file);
      }

      await createPostGroup(url, groupId, formData);

      toast.success("Đăng bài viết thành công!!!", TOAST_OPTION_DEFAULT);

      handleRevokeBlobUrl(images);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      errorHandler(err, ERR_CREATE_POST);
    }
  };

  return (
    <div className='flex flex-col gap-2 w-full items-center font-quick_sans'>
      <ModalUploadFile
        trigger={
          <div className={clsx(
            "w-[350px] h-20 flex gap-5 items-center justify-center overflow-hidden cursor-pointer",
            "border-b border-black dark:border-white rounded-lg")}>
            <img
              src={user.avatar.url}
              alt='img_group'
              className='h-12 w-12 rounded-full object-cover'
            />

            <p >Hãy viết cảm nghĩ của bạn...</p>
          </div>
        }

        onUpload={handleCreatePostGroup}
      />

      <ListPostGroup permission={permission} groupId={groupId} role={role} />
    </div>
  )
}

export default TabContentPosts

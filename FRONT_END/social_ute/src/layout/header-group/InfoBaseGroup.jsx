import { Badge } from "components/badge"
import { EPrivacyGroup, ERoleNameGroup } from "constants/group/enum"
import ActionsGroup from "./ActionsGroup"

const genLabelPrivacy = (privacy) => {
  switch (privacy) {
    case EPrivacyGroup.PUBLIC:
      return 'Công khai (mặc định)'
    case EPrivacyGroup.PRIVATE:
      return 'Riêng tư'
    default:
      return ''
  }
}

const genLabelRole = (role) => {
  switch (role) {
    case ERoleNameGroup.SUPERADMIN:
      return 'Trưởng nhóm'
    case ERoleNameGroup.ADMIN:
      return 'Quản trị viên'
    case ERoleNameGroup.MEMBER:
      return 'Thành viên'
    default:
      return
  }
}

const InfoBaseGroup = ({ info }) => {
  return (
    <div className='flex flex-col w-full h-max border-b border-black gap-2 px-2 rounded-md dark:border-white'>
      <h1 className='text-[30px] font-bold uppercase'>{info.name}</h1>

      <div className='grid lg:grid-cols-2 sm:grid-cols-1 w-full'>
        <div className='grid gap-2 border-r border-black dark:border-white min-h-[100px] text-lg'>
          <h4>Nhóm {genLabelPrivacy(info.privacyGroup)}

            <span className="ml-2">
              {
                info.roleName !== ERoleNameGroup.MEMBER && <Badge>
                  {genLabelRole(info.roleName)}
                </Badge>
              }
            </span>
          </h4>

          <h4>{info.numberMember} thành viên</h4>
        </div>

        <ActionsGroup permission={info.permission} />
      </div>
    </div>
  )
}

export default InfoBaseGroup

import LoadingComponent from 'combine/loading-component';
import { TYPELOADING } from 'constants/type.const';
import { useNavigate } from 'react-router-dom';
import { getFullName } from 'utils/user.utils';

const ListSearchUser = ({ userSearch, isLoading }) => {
  const totals = userSearch.totals
  const navigate = useNavigate()

  const handleNavigateUser = (id) => {
    navigate(`home-guest/${id}`)

    setTimeout(() => { window.location.reload() }, 1000)
  }

  return (
    <LoadingComponent type={TYPELOADING.TITLE} title='Đang lấy dữ liệu' condition={!isLoading}>
      {
        totals !== 0 ?
          <div
            className="grid grid-cols-1 gap-3 w-4/5 h-full items-start justify-start"
          >
            {
              userSearch.allUser.map((user) => {
                return (
                  <div
                    key={user._id}
                    onClick={() => handleNavigateUser(user._id)}
                    className='flex gap-3 cursor-pointer'>
                    <img
                      width={60}
                      height={40}
                      src={user.avatar.url}
                      alt={user.last_name}
                      className="rounded-full"
                    />

                    <div className='flex flex-col'>
                      <p className='text-lg font-quick_sans text-black'>
                        {getFullName(user.first_name, user.last_name)}
                      </p>

                      <p className='text-lg font-quick_sans text-black'>
                        {user.department}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
          : <p className="text-lg font-quick_sans text-black">
            Không có kết quả tìm kiếm
          </p>
      }
    </LoadingComponent>
  )
}

export default ListSearchUser

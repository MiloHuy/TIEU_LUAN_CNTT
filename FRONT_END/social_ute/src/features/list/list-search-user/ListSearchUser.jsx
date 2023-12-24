import { useNavigate } from 'react-router-dom';
import { getFullName } from 'utils/user.utils';

const ListSearchUser = ({ userSearch, onCloseModal }) => {
    const totals = userSearch.totals
    const navigate = useNavigate()

    const handleNavigateUser = (id) => {
        navigate(`home-guest/${id}`)

        setTimeout(() => { window.location.reload() }, 1000)
        // onCloseModal()
    }

    return (
        totals !== 0 ?
            <div
                className="grid grid-cols-1 gap-3 w-4/5 h-full items-start justify-start px-3"
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
                                    <p className='text-lg font-mono text-black'>
                                        {getFullName(user.first_name, user.last_name)}
                                    </p>

                                    <p className='text-lg font-mono text-black'>
                                        {user.department}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            : <p className="text-lg font-mono text-black">
                Không có kết quả tìm kiếm
            </p>
    )
}

export default ListSearchUser

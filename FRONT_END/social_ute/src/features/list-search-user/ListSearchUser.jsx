import { useNavigate } from 'react-router-dom';

const ListSearchUser = ({ userSearch, handleClosePopup }) => {
    const totals = userSearch.totals
    const navigate = useNavigate()

    const handleNavigateUser = (id) => {
        navigate(`home-guest/${id}`)
        handleClosePopup()
    }

    return (
        totals !== 0 ?
            <div
                className="grid grid-cols-1 gap-3 w-full items-start justify-start px-3"
            >
                {
                    userSearch.allUser.map((user) => {
                        return (
                            <div
                                onClick={() => handleNavigateUser(user._id)}
                                className='flex gap-3 cursor-pointer'>
                                <img
                                    width={40}
                                    height={40}
                                    src={user.avatar.url}
                                    alt={user.last_name}
                                    className="rounded-full"
                                />

                                <div className='flex flex-col'>
                                    <p>
                                        {user.last_name}
                                    </p>

                                    <p>
                                        Đoàn khoa
                                    </p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            : 'Không có kết quả tìm kiếm'
    )
}

export default ListSearchUser

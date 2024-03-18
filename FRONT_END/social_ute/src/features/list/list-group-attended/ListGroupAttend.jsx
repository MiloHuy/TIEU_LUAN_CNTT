import CardGroupAttended from "features/card/card-group-attended"

const ListGroupAttended = ({ groups }) => {
    return (
        <div className='grid grid-cols-3 gap-3'>
            {
                groups.length !== 0 ?
                    groups.map((group, i) => {
                        return (
                            <CardGroupAttended
                                groupInfo={group} />
                        )
                    })
                    :
                    <p className="text-black dark:text-white font-quick_sans">
                        Bạn chưa tham gia nhóm nào.
                    </p>
            }
        </div>
    )
}

export default ListGroupAttended

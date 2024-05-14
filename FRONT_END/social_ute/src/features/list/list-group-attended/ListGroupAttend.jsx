import CardGroupAttended from "features/card/card-group-attended"

const ListGroupAttended = ({ groups }) => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-1 justify-center gap-3 w-full h-full'>
      {
        groups.length !== 0 ?
          groups.map((group) => {
            return (
              <CardGroupAttended
                groupInfo={group} />
            )
          })
          :
          <p>Bạn chưa tham gia nhóm nào.</p>
      }
    </div>
  )
}

export default ListGroupAttended

import { Button } from "components/button"

const CardGroupAttended = ({ groupInfo }) => {
    return (
        <div className='w-[25vw] h-[55vh] rounded-[20px] border border-black dark:border-white flex flex-col'>
            <img
                alt='bg-group'
                src={groupInfo.img}
                className="h-[40vh] w-full object-cover rounded-t-[20px] border-b border-black dark:border-white"
            />

            <div className='grid grid-cols-1 items-start justify-center h-[15vh]'>
                <p className="font-quick_sans font-bold text-center hover:underline text-black dark:text-white">
                    {groupInfo.name}
                </p>

                <div className='flex gap-5 mb-2 justify-center'>
                    <Button
                        variant='destructive'
                        className='p-5'
                    >
                        Rời nhóm
                    </Button>

                    <Button
                        className='p-5'
                    >
                        Xem nhóm
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardGroupAttended

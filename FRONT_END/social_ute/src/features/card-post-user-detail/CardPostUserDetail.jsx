import CardBody from "./CardBody"
import CardFooter from "./CardFooter"
import CardHeader from "./CardHeader"

const CardPostUserDetail = ({ post_img, post_description, userName }) => {
    return (
        <div className='w-full h-[500px] grid grid-cols-2 gap-2'>
            <div className="h-full">
                <img
                    alt="img"
                    className="object-fill h-[500px] w-full rounded-xl"
                    src={post_img}
                />
            </div>

            <div className="grid grid-rows-7 gap-2 h-[550px]">
                <div className='row-span-1 flex items-start mt-2'>
                    <CardHeader userName={userName} />
                </div>

                <div className='row-span-4'>
                    <CardBody />
                </div>

                <div className='row-span-2'>
                    <CardFooter />
                </div>
            </div>
        </div>
    )
}

export default CardPostUserDetail

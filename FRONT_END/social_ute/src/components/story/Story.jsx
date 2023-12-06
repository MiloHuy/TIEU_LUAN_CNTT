import { Card, CardHeader, Image } from "@nextui-org/react";

const Story = ({ img }) => {

    return (
        <div className='grid grid-cols-1 justify-center gap-2'>

            <Card className=" sm:col-span-4 h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col ">

                </CardHeader>

                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-[300px] object-cover"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
            </Card>

        </div>
    )
}

export default Story

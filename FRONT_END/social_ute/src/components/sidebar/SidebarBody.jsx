import { Button } from '@nextui-org/react';
import clsx from 'clsx';

const SidebarBody = (props) => {
    const { icons, className } = props

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full flex flex-col gap-4 p-2 '>
                {icons.map((item) => {
                    return (
                        <div key={item.name} className='flex flex-row gap-2 justify-center'>
                            <Button
                                className='w-full flex justify-start gap-6'
                                color="default"
                                variant="light"
                                startContent={item.icon}
                            >
                                <p className='font-merriweather text-lg'>
                                    {item.name}
                                </p>
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SidebarBody

import { Button } from '@nextui-org/react';
import clsx from 'clsx';

const SidebarBody = (props) => {
    const { icons, className } = props

    return (
        <div className={clsx('w-full h-full', className)}>
            <div className='w-full h-full flex flex-col gap-4 p-4'>
                {icons.map((item) => {
                    return (
                        <div key={item.name} className='flex flex-row gap-2'>
                            <Button
                                className='w-full flex justify-start'
                                color="default"
                                variant="bordered"
                                startContent={item.icon}>
                                {item.name}
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SidebarBody

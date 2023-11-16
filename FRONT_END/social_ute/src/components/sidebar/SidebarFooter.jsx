import { Switch } from '@nextui-org/react'
import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'
import { useMemo, useState } from 'react'

const SidebarFooter = (props) => {
    const { className } = props
    const [isSelected, setIsSelected] = useState(true);

    useMemo(() => {
        if (isSelected === true)
            props.handleSwitch('light')
        else
            props.handleSwitch('dark')
    }, [isSelected, props])

    return (
        <div className={clsx('w-full h-full', className)}>
            <Switch
                defaultSelected
                size="lg"
                color="default"
                isSelected={isSelected}
                onValueChange={setIsSelected}
                startContent={<Sun />}
                endContent={<Moon />}
            >
            </Switch>
        </div>
    )
}

export default SidebarFooter

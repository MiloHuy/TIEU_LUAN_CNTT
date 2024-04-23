import clsx from 'clsx';
import Switch from 'components/switch';
import { useMemo, useState } from 'react';

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
        <div className={clsx('', className)}>
            <Switch checked={isSelected} onCheckedChange={() => setIsSelected(!isSelected)} />
        </div>
    )
}

export default SidebarFooter

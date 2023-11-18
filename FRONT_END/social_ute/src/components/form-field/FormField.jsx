import clsx from "clsx"
import { cloneElement } from "react"


const FormField = ({ className, children, label, error, hint, layout = 'vertical', ...props }) => {
    const errorClass = 'text-red-500'
    const childrenClass = clsx(children.props.className, {
        'border-red-500': error,
        [errorClass]: error
    })

    const field = cloneElement(children, { ...props, className: childrenClass })

    return (
        <div className={clsx(className, {
            'grid-cols-[minmax(80px,20%)_minmax(0,_1fr)]': layout === 'horizontal'
        })}>
            {label
                &&
                <h1
                    className={clsx({ [errorClass]: error, })}
                    htmlFor={props.id}>
                </h1>
            }

            <div className='grid gap-2'>
                {field}

                {error && (
                    <small className={clsx({ [errorClass]: error })}>
                        {error}
                    </small>
                )}

                {hint && <span className='text-gray-500 text-xs'>{hint}</span>}
            </div>

        </div >
    )
}

export default FormField


const LoadingDot = () => {
    const dots = 6

    return (
        <div className='w-96 h-full'>
            <div className='relative rounded-md flex justify-center items-center top-0 w-full h-full'>
                {
                    Array.from({ length: dots }).map((_, dotIndex) => {
                        return (
                            <div className='grid grid-rows-1 gap-2'>
                                <div
                                    key={dotIndex}
                                    className={`animate-loading absolute ease-in-out h-[10px] w-[10px] rounded-full bg-black bg-opacity-80 z-50 dark:bg-white`}
                                    style={{ animationDelay: `${(dots - dotIndex) * 100}ms` }}
                                >
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LoadingDot

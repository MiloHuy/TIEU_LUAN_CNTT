import imgGroup03 from "assets/images/bg-group-01.jpg";
import imgGroup04 from "assets/images/bg-group-02.jpg";
import imgGroup05 from "assets/images/bg-group-03.jpg";
import clsx from "clsx";

const Album = ({ label, images, className }) => {
    return (
        <div className={clsx('w-[25vw] h-[30vh] flex flex-col gap-3', className)}>
            <p className='text-black dark:text-white text-lg text-center font-quick_sans '>
                {label ? label : 'Tháng 3 - 2024'}
            </p>

            {
                images
                    ?
                    ''
                    :
                    <div className='relative flex justify-center'>
                        <img
                            src={imgGroup03}
                            alt="img 1"
                            className="absolute w-[21vw] h-[35vh] rounded-[15px] drop-shadow-md border border-black"
                        />

                        <img
                            src={imgGroup04}
                            alt="img 2"
                            className="absolute translate-y-4 w-[23vw] h-[35vh] rounded-[15px] drop-shadow-md border border-black"
                        />

                        <img
                            src={imgGroup05}
                            alt="img 3"
                            className="absolute translate-y-8 w-[25vw] h-[35vh] rounded-[15px] drop-shadow-md border border-black"
                        />
                    </div>
            }
        </div>
    )
}

export default Album

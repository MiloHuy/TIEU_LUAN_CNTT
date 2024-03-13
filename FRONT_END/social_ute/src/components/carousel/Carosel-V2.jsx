import clsx from 'clsx';
import { PostType } from 'constants/post.const';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

const CaroselVersion2 = ({ slides, className, type }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    const background = useMemo(() => {
        switch (type) {
            case PostType.POST_IMG:
                return `url(${slides[currentIndex].url})`
            case PostType.IMAGE_PREVIEW:
                return `url(${slides[currentIndex]})`
            default:
                return
        }
    }, [type, slides, currentIndex])

    return (
        <div className={clsx('h-full max-h-[75vh] w-full max-w-[55vw] m-auto relative group', className)}>
            <div
                style={{ backgroundImage: background }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-no-repeat'
            ></div>

            {slides.length !== 1 ?
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronLeft onClick={prevSlide} size={30} />
                </div>
                : ''}

            {slides.length !== 1 ?
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronRight onClick={nextSlide} size={30} />
                </div>
                : ''}

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, slideIndex) => {
                    return (
                        <div
                            onClick={() => goToSlide(slideIndex)}
                            key={"circle" + slideIndex}
                            className={`rounded-full w-2 h-2 cursor-pointer  ${slideIndex === currentIndex ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    )
}

export default CaroselVersion2

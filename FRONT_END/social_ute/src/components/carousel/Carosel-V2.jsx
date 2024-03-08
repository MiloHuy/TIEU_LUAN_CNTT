import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const CaroselVersion2 = ({ slides }) => {
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

    return (
        <div className='h-full max-h-[75vh] w-full max-w-[55vw] m-auto relative group'>
            <div
                style={{ backgroundImage: `url(${slides[currentIndex]})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-no-repeat'
            ></div>

            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ChevronLeft onClick={prevSlide} size={30} />
            </div>

            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ChevronRight onClick={nextSlide} size={30} />
            </div>

            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, slideIndex) => {
                    return (
                        <div
                            onClick={() => goToSlide(slideIndex)}
                            key={"circle" + slideIndex}
                            className={`rounded-full w-3 h-3 cursor-pointer  ${slideIndex === currentIndex ? "bg-white" : "bg-gray-500"
                                }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    )
}

export default CaroselVersion2

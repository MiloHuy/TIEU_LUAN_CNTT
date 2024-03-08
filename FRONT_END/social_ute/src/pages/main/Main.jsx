import { useRef } from "react";
import { Link } from 'react-router-dom';
import About from "./About";
import Home from "./Home";

export const slides = [
  'https://i.pinimg.com/564x/9a/cc/ac/9accac21685cdb7dc2a7edde8b3daa33.jpg',
  'https://i.pinimg.com/564x/cc/2c/f1/cc2cf1509516b0fe79b2c4b64e642a0d.jpg',
  'https://i.pinimg.com/736x/86/46/63/86466304f38c520847d4ed65331f3f15.jpg',
  'https://i.pinimg.com/736x/c5/04/ce/c504ce97f611b279f88b30858e19dd0a.jpg'
]

const Public = () => {

  const home = useRef(null)
  const about = useRef(null)

  const scrollSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }

  return (
    <div className="grid grid-cols-1">
      <div className='w-full flex justify-items-stretch h-[8vh]'>
        <div className="w-full h-full grid grid-cols-2 justify-between items-end border-b border-black px-4">
          <div className="flex justify-start items-center h-full" >
            <p className="text-2xl font-young_serif tracking-wide">SOCIAL HCMUTE</p>
          </div>

          <div className="w-full gap-4 justify-end flex h-full items-center" >
            <div>
              <Link color="foreground" to="/home" onClick={() => scrollSection(home)}>
                <p className="text-sm font-bold font-questrial tracking-wide  hover:underline">TRANG CHỦ</p>
              </Link>
            </div>

            <div>
              <Link to="/about" aria-current="page" onClick={() => scrollSection(about)}>
                <p className="text-sm font-bold font-questrial tracking-wide hover:underline">NHÓM THỰC HIỆN</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div ref={home} id='home' className='min-h-[100vh] '>
        <Home />
      </div>

      <div ref={about} id='about' className='min-h-[100vh]'>
        <About />
      </div>
    </div>
  )
}

export default Public

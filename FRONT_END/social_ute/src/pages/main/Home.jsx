import { Button } from "@nextui-org/react";
import { SSOCOOKIES } from 'constants/app.const';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Home = () => {
    const token = Cookies.get(SSOCOOKIES.access)

    return (
        <div className="relative w-full h-full text-center bg-bg_hcmute_01 bg-cover bg-no-repeat">
            <div className="after:absolute after:inset-0 after:bg-black after:opacity-50 after:brightness-50"></div>

            <div className="relative w-full flex flex-col gap-3 justify-start items-center p-5 h-full m-auto">
                <h1 className="text-white text-center font-questrial text-[50px] font-black mb-5 z-50">Mạng xã hội trường Đại học Sư Phạm Kỹ Thuật</h1>

                <div className='relative w-3/4 grid grid-cols-1 gap-1'>
                    <p className="text-white text-center font-questrial text-[20px] font-bold mb-5 z-50">Chào mừng bạn đến với một không gian kết nối đầy sáng tạo và đa dạng - trang mạng xã hội của chúng tôi!</p>
                    <p className="text-white text-center font-questrial text-[20px] font-bold mb-5 z-50">Đây không chỉ là một nơi để chia sẻ những khoảnh khắc cuộc sống, mà còn là một cộng đồng năng động, nơi mọi người có thể tìm kiếm, kết nối và tương tác với những người khác trong HCMUTE.</p>
                </div>

                <div className='flex justify-center gap-2 w-full items-center'>
                    <p className="text-white text-center font-questrial text-[20px] z-50 font-bold">Hãy cùng nhau khám phá tại đây.</p>

                    <Button
                        as={Link}
                        to="#"
                        radius="sm"
                        size='sm'
                        variant="bordered"
                        className="text-md font-questrial text-white border-2 border-black -translate-y-1"
                    >
                        {
                            token
                                ?
                                <Link to='./welcome' className="font-bold">Xin chào</Link>
                                :
                                <Link to='./login' className="font-bold">Đăng nhập</Link>
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home

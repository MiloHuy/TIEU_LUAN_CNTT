
const About = () => {

    return (
        <div className='relative w-full h-full'>
            <div className="flex flex-col items-center justify-around px-3 w-full h-full">
                <p className="text-black text-center font-nunito_sans  font-bold text-[50px] mt-3">
                    Danh sách sinh viên tham gia
                </p>

                <div className='flex gap-5'>
                    <div className='w-[30vw] h-max border border-black rounded-xl shadow-custom_shadow'>
                        <div className="grid grid-cols-1 gap-2 justify-center">
                            <div className='flex w-full justify-center border-black mt-2'>
                                <img
                                    className='rounded-full w-[10rem] h-[10rem] object-cover'
                                    alt='member01'
                                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" />
                            </div>

                            <div className='flex flex-col gap-2 w-full items-center'>
                                <p className="text-black  font-nunito_sans font-bold text-md">Huỳnh Hùng Phú</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">12/06/2002</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">Nam</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">0764455931</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">20110540</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">20110540@student.hcmute.edu.vn</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">GVHD: Nguyễn Hữu Trung</p>

                            </div>

                        </div>
                    </div>

                    <div className='w-[30vw] h-max border  border-black rounded-xl shadow-custom_shadow'>
                        <div className="grid grid-cols-1 gap-2 justify-center">
                            <div className='flex w-full justify-center  border-black mt-2'>
                                <img
                                    className='rounded-full w-[10rem] h-[10rem] object-cover'
                                    alt='member01'
                                    src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" />
                            </div>

                            <div className='flex flex-col gap-2 w-full items-center'>
                                <p className="text-black  font-nunito_sans font-bold text-md">Nguyễn Đình Quang Huy</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">07/05/2002</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">Nam</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">0813166045</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">20110494</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">20110494@student.hcmute.edu.vn</p>
                                <p className="text-black  font-nunito_sans font-bold text-md">GVHD: Nguyễn Hữu Trung</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About

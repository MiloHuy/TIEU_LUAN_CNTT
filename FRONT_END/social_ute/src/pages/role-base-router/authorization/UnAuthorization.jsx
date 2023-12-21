export default function Unauthorized() {
    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <p className="text-lg font-mono text-black dark:text-white"> Lỗi:403 No Permission </p>
            <p className="text-lg font-mono text-black dark:text-white"> Rất tiếc, trang này hiện không khả dụng.</p>
            <p className="text-lg font-mono text-black dark:text-white"> Bạn không đủ quyền truy cập vào trang này. </p>
        </div>
    )
}

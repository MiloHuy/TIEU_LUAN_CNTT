
const LoadingDotV2 = () => {
    return (
        <div class="w-full h-[30vh] relative z-[1]">
            <div class="w-[20px] h-[20px] left-[10%] absolute rounded-full bg-black origin-[50%] animate-loading_dot_v2 ease"></div>
            <div class="w-[20px] h-[20px] left-[20%] absolute rounded-full bg-black origin-[50%] delay-200 animate-loading_dot_v2 ease"></div>
            <div class="w-[20px] h-[20px] left-[30%] absolute rounded-full bg-black origin-[50%] delay-300 animate-loading_dot_v2 ease"></div>
            <div class="w-[20px] h-[20px] left-[40%] absolute rounded-full bg-black origin-[50%] delay-400 animate-loading_dot_v2 ease"></div>

            <div class="w-[20px] h-[5px] rounded-full bg-black absolute blur-none top-1/2 z-[-1] left-[10%]  animate-shadow ease"></div>
            <div class="w-[20px] h-[5px] rounded-full bg-black absolute blur-none top-1/2 z-[-1] left-[20%] delay-200 animate-shadow ease"></div>
            <div class="w-[20px] h-[5px] rounded-full bg-black absolute blur-none top-1/2 z-[-1] left-[30%] delay-300 animate-shadow ease"></div>
            <div class="w-[20px] h-[5px] rounded-full bg-black absolute blur-none top-1/2 z-[-1] left-[40%] delay-400 animate-shadow ease"></div>
        </div>
    )
}

export default LoadingDotV2

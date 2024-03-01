import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "components/resizable"
import HeaderPostUser from "layout/header-post-user"

const PostDetailV2 = () => {
    return (
        <div className='w-full h-[90vh] flex items-center px-3'>
            <ResizablePanelGroup
                direction="horizontal"
                className="w-[65vw] rounded-lg border border-black"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="w-full h-full">
                        <img
                            loading="lazy"
                            alt="img"
                            className="object-cover w-full h-full"
                            src='https://github.com/shadcn.png'
                        />
                    </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={10}>
                            <HeaderPostUser />
                        </ResizablePanel>

                        <ResizableHandle />

                        <ResizablePanel defaultSize={75}>
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Three</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default PostDetailV2

import clsx from "clsx";
import InputPush from "combine/input-push";
import LoadingComponent from "combine/loading-component";
import CaroselVersion2 from "components/carousel/Carosel-V2";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "components/resizable";
import { PostType } from "constants/post.const";
import { TYPELOADING } from "constants/type.const";
import DropdownShowMoreOptions from "features/dropdown/dropdown-show-more-options";
import ListCommentUser from "features/list/list-comment-user";
import { usePushComment } from "hook/comment/usePushComment";
import HeaderPostUser from "layout/header-post-user";
import FieldAvatarNameTimeDes from "./FieldModalPostUser/FieldAvatarNameTimeDes";

const ModalPostUserV2 = ({ trigger, className, postDetail, userName }) => {

  const { isLoading, handlePostComment } = usePushComment({ postId: postDetail?._id })

  const handlePostCommnentInput = (commentInput) => {
    if (!commentInput) return;

    handlePostComment(commentInput)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent className={clsx('min-w-[70vw] min-h-[80vh] p-0', className)}>
        <LoadingComponent type={TYPELOADING.DOT} condition={postDetail}>
          {
            postDetail
            &&
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full h-full rounded-lg border"
            >
              <ResizablePanel defaultSize={50}>
                <CaroselVersion2
                  className='max-w-[70vw] h-[80vh] max-h-[80vh]'
                  type={PostType.POST_IMG}
                  slides={postDetail.post_img} />
              </ResizablePanel>

              <ResizableHandle className='border border-black/30' />

              <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">

                  <ResizablePanel defaultSize={15}>
                    <div className="flex h-full items-center justify-center p-4">
                      <HeaderPostUser
                        className='min-h-[8vh] h-[8vh] rounded-[30px] w-[40vw]'
                        img={postDetail.user_id.avatar.url}
                        name={userName}
                        action={
                          <DropdownShowMoreOptions
                            user_id={postDetail.user_id._id}
                            post_id={postDetail._id}
                          />
                        }
                      />
                    </div>
                  </ResizablePanel>

                  <ResizableHandle className='border border-black/30' />

                  <ResizablePanel defaultSize={85}>
                    <div className="flex flex-col justify-between gap-2 h-full w-full p-4">
                      <FieldAvatarNameTimeDes
                        imgAvatar={postDetail.user_id.avatar.url}
                        fullName={userName}
                        postDescription={postDetail.post_description}
                      />

                      <ListCommentUser postId={postDetail?._id} />

                      <div className='grid gap-1'>
                        <InputPush
                          isLoading={isLoading}
                          onSubmit={handlePostCommnentInput}
                          className={clsx(
                            'px-1',
                            'border border-black/50',
                            'focus-within:border focus-within:ring-offset-transparent',
                          )}
                          placeholder='Nhập bình luận của bạn'
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          }
        </LoadingComponent>
      </DialogContent>
    </Dialog >
  )
}

export default ModalPostUserV2

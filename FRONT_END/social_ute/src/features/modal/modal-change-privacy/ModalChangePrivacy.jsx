import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { Button } from "components/button";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import { RadioGroup, RadioGroupItem } from "components/radio-group";
import { TYPELOADING } from "constants/type.const";
import { genOptionsPrivacyPost } from "features/select/select-privacy/SelectPrivacy";
import { usePrivacyPost } from "hook/posts/usePrivacyPost";
import { Loader2 } from 'lucide-react';
import { useState } from "react";

const ModalChangePrivacy = ({ trigger, className, title, defaultValue, post_id }) => {
  const options = genOptionsPrivacyPost()
  const { isLoading, handleChangePrivacyPost } = usePrivacyPost({ post_id })
  const [option, setOption] = useState(defaultValue)

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? trigger : <Button>Thay đổi phạm vi</Button>}
      </DialogTrigger>

      <DialogContent
        className={clsx(
          'min-w-[20vw] w-[40vw] min-h-[35vh] h-max p-2 grid gap-2 items-center uppercase',
          'font-bold text-lg font-quick_sans',
          className)}>
        <p className='text-center'>
          {title}
        </p>

        <div className="w-full px-4 grid gap-2 font-quick_sans">
          <LoadingComponent type={TYPELOADING.TITLE} condition={defaultValue} title='Chưa có privacy cho bài post này'>
            <RadioGroup defaultValue={defaultValue} onValueChange={setOption}>
              {
                options.map((option) => {
                  return (
                    <div className={clsx(
                      'flex items-center space-x-2 justify-between px-2',
                      'w-full h-20 border border-black rounded-md',
                      'cursor-pointer'
                    )}>
                      <div className='flex gap-2 items-center'>
                        {option.icon}
                        <label htmlFor={option.value}>{option.label}</label>
                      </div>
                      <RadioGroupItem value={option.value} id={option.value} />
                    </div>
                  )
                })
              }
            </RadioGroup>
          </LoadingComponent>

          <LoadingComponent type={TYPELOADING.NULL} condition={defaultValue}>
            <div className='w-full flex justify-end'>
              <Button className='w-1/2' disabled={isLoading} onClick={() => handleChangePrivacyPost(option)}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Xong
              </Button>
            </div>
          </LoadingComponent>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default ModalChangePrivacy

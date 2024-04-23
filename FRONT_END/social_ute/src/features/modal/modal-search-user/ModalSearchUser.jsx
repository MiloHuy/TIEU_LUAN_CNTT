import clsx from "clsx";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import SearchBlockDebounce from "components/search-block-debounce";
import ListSearchUser from "features/list/list-search-user";
import { useSearchUser } from "hook/me/useSearchUser";
import { useEffect, useState } from "react";

const ModalSearchUser = ({ trigger, className }) => {

  const { userSearch, isLoading, fetchSearchUser } = useSearchUser()

  const [filter, setFilter] = useState({
    page: 1,
    size: 0,
    search: ''
  })

  const handleSearchDebounce = (query) => {
    setFilter((prev) => ({
      ...prev,
      size: 3,
      search: query.search
    }))
  }

  useEffect(() => {
    if (filter.size !== 0) {
      fetchSearchUser(
        filter.page,
        filter.size,
        filter.search
      )
    }
  }, [fetchSearchUser, filter.size, filter.page, filter.search])

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent
        hideCloseButton={true}
        className={clsx('sm:rounded-lg overflow-hidden min-h-[45vh] max-w-[55vw]', className)}>

        <div className='flex flex-col w-full h-full gap-5'>
          <SearchBlockDebounce
            placeholder='Tìm kiếm bạn bè'
            className='w-full'
            onSubmit={handleSearchDebounce}
          />
          {
            userSearch ?
              <div className='w-full h-4/5 overflow-auto '>
                <ListSearchUser
                  isLoading={isLoading}
                  userSearch={userSearch.data}
                />
              </div>
              :
              <p className="text-lg font-quick_sans text-black">
                Chưa có ai hiện tại
              </p>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSearchUser

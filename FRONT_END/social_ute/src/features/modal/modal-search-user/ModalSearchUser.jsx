import clsx from "clsx";
import LoadingComponent from "combine/loading-component";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog";
import SearchBlockDebounce from "components/search-block-debounce";
import { TYPELOADING } from "constants/type.const";
import ListSearchUser from "features/list/list-search-user";
import { useSearchUser } from "hook/me/useSearchUser";
import { useEffect, useState } from "react";

const ModalSearchUser = ({ trigger, className }) => {

  const { resultSearch, fetchSearch } = useSearchUser()

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
      fetchSearch(
        filter.page,
        filter.size,
        filter.search
      )
    }
  }, [fetchSearch, filter.size, filter.page, filter.search])

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
            <LoadingComponent type={TYPELOADING.TITLE} condition={Boolean(resultSearch)}>
              <ListSearchUser resultSearch={resultSearch} />
            </LoadingComponent>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalSearchUser

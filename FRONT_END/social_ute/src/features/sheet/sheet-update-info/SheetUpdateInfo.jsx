import PropagateLoader from "components/loading/propagate-loading"
import { Sheet, SheetContent, SheetTrigger } from "components/sheet"
import FormUpdateUser from "features/form/form-update-user"
import { useCallback, useEffect, useState } from "react"
import { getMeInfo } from "services/me.svc"

const SheetUpdateInfo = ({ trigger }) => {
    const [updateUser, setUpdateUser] = useState()
    const handleUpdateUser = useCallback(
        async () => {
            try {
                const data_Info = await getMeInfo()
                setUpdateUser({ ...data_Info })
            }
            catch (err) {
                console.log("err:" + err)
            }
        }, [])

    useEffect(() => {
        handleUpdateUser()
    }, [handleUpdateUser])

    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent side='bottom'>
                {
                    updateUser
                        ?
                        <div className='w-full h-full flex items-center justify-center'>
                            <FormUpdateUser
                                updateUser={updateUser.data} />
                        </div>
                        :
                        <div className='w-full h-full flex items-center justify-center'>
                            <PropagateLoader
                                color="#9aa19f"
                                size={18}
                            />
                        </div >
                }
            </SheetContent>
        </Sheet>
    )
}

export default SheetUpdateInfo

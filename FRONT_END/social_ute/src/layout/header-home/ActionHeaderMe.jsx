import { Button } from "components/button";
import SheetUpdateInfo from "features/sheet/sheet-update-info";
import { Settings } from 'lucide-react';

const ActionHeaderMe = () => {
  return (
    <div className='flex gap-2'>
      <SheetUpdateInfo
        trigger={
          <Button
            variant='outline'
            radius="sm"
            className="w-50 h-7 font-quick_sans font-bold px-2"
          >
            Chỉnh sửa thông tin cá nhân
          </Button>
        }
      />

      <Button
        variant="light"
        className="h-7"
      >
        <Settings
          size={20}
          strokeWidth={0.75}
          absoluteStrokeWidth
          className="hover:rotate-45"
        />
      </Button>

    </div>
  )
}

export default ActionHeaderMe

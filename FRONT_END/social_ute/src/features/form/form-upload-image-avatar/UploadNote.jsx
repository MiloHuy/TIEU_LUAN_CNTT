import clsx from 'clsx';
import { Camera } from 'lucide-react';

const UploadNote = () => {
  const labelNote = [
    'Nhắn để tải ảnh lên',
    'Chỉ chấp nhận các file có định dạng: JPEG, PNG, JPG',
    'Kích thước file tổi đa là 10MB'
  ]

  return (
    <div className={
      clsx(
        "flex flex-col items-center justify-around min-h-[300px]",
        "text-sm text-center p-4 dark:text-gray-400 font-quick_sans"
      )}>
      <Camera size={50} strokeWidth={1} color='#000000' />

      {labelNote.map((note) => {
        return <p key={note}>{note}</p>
      })}
    </div>
  )
}

export default UploadNote

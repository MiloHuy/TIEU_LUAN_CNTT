import { Camera } from 'lucide-react';

const UploadNote = () => {
  return (
    <div className="flex flex-col items-center pt-5 pb-6 gap-2 text-sm text-gray-500 dark:text-gray-400 font-quick_sans">
      <Camera size={50} strokeWidth={1} color='#000000' />
      <p> Nhắn để tải ảnh lên </p>
      <p> Chỉ chấp nhận các file có định dạng: JPEG, PNG, JPG </p>
      <p> Kích thước file tổi đa là 10MB </p>
    </div>
  )
}

export default UploadNote

import { Book, Bookmark, Grid3X3, Users } from 'lucide-react';

export const genTitleTab = (key) => {
  switch (key) {
    case "posts":
      return (
        <div className="flex items-center space-x-2">
          <Grid3X3 size={20} />
          <span className="dark:text-white font-quick_sans">Bài viết</span>
        </div>
      )
    case "story":
      return (
        <div className="flex items-center space-x-2">
          <Book size={20} />
          <span className="dark:text-white font-quick_sans">Story</span>
        </div>
      )
    case "friends":
      return (
        <div className="flex items-center space-x-2">
          <Users size={20} />
          <span className="dark:text-white font-quick_sans">
            Bạn bè
          </span>
        </div>
      )
    case "postsSaved":
      return (
        <div className="flex items-center space-x-2">
          <Bookmark
            size={20}
            strokeWidth={1.5}
          />
          <span className="dark:text-white text-black font-quick_sans">
            Bài viết đã lưu
          </span>
        </div>
      )
    default:
      return null
  }
}

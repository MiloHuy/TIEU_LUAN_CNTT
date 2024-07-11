import clsx from "clsx";
import AvatarComponent from "components/avatar";
import { formatDate } from "utils/format-date.utils";

const FieldAvatarNameTimeDes = ({
  imgAvatar,
  fullName,
  className,
  postDescription,
  createdAt,
}) => {
  return (
    <div className={clsx("w-full h-[10vh] flex items-start gap-2", className)}>
      <AvatarComponent.Avatar>
        <AvatarComponent.AvatarImage src={imgAvatar} />
        <AvatarComponent.AvatarFallback>Img</AvatarComponent.AvatarFallback>
      </AvatarComponent.Avatar>

      <div className="grid text-sm text-black dark:text-white font-quick_sans">
        <div className="flex gap-2">
          <p className="font-bold hover:underline cursor-pointer gap-2">
            {fullName}
          </p>
          <p>{formatDate(createdAt)}</p>
        </div>

        <p className="line-clamp-2">{postDescription}</p>
      </div>
    </div>
  );
};

export default FieldAvatarNameTimeDes;

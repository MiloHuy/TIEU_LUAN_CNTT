import clsx from "clsx";
import AvatarComponent from "components/avatar";
import { formatDate } from "utils/format-date.utils";
import { useMemo } from "react";
import {
  PrivacyPost,
  PrivacyPostLabel,
} from "features/select/select-privacy-post/SelectPrivacyPost";
import { Earth, LockKeyhole, User } from "lucide-react";
import TooltipContentCombine from "combine/tooltip-content/TooltipContent";

const FieldAvatarNameTimeDes = ({
  imgAvatar,
  fullName,
  className,
  postDescription,
  createdAt,
  privacy,
}) => {
  const renderIconPrivacy = useMemo(() => {
    switch (privacy) {
      case PrivacyPost.ALONE:
        return (
          <TooltipContentCombine
            trigger={<LockKeyhole size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.ALONE}
          />
        );
      case PrivacyPost.FOLLOWER:
        return (
          <TooltipContentCombine
            trigger={<User size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.FOLLOWER}
          />
        );
      case PrivacyPost.EVERYONE:
        return (
          <TooltipContentCombine
            trigger={<Earth size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.EVERYONE}
          />
        );
      default:
        return;
    }
  }, [privacy]);

  return (
    <div className={clsx("w-full flex items-start gap-2", className)}>
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

        <p>
          {postDescription} <span>{renderIconPrivacy}</span>
        </p>
      </div>
    </div>
  );
};

export default FieldAvatarNameTimeDes;

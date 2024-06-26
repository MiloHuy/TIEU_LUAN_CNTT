import clsx from "clsx";
import TooltipContentCombine from "combine/tooltip-content/TooltipContent";
import {
  PrivacyPost,
  PrivacyPostLabel,
} from "features/select/select-privacy-post/SelectPrivacyPost";
import { Earth, LockKeyhole, MoreHorizontal, User } from "lucide-react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const HeaderPostUser = ({
  img,
  name,
  href,
  action,
  className,
  privacy,
  dateBetween,
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
    <div
      className={clsx(
        "border-b border-black text-black flex justify-between overflow-hidden h-14",
        "dark:text-white dark:border-white font-quick_sans",
        className
      )}
    >
      <div className="w-full h-full flex items-center gap-2">
        <img
          loading="lazy"
          alt="img"
          className="object-cover w-12 h-12 rounded-full"
          src={img ? img : "https://github.com/shadcn.png"}
        />

        <div className="flex flex-col items-start">
          <div className="flex gap-2 items-center">
            <Link to={href}>
              <p className="text-lg"> {name ? name : "User"}</p>
            </Link>
          </div>

          <p className="text-sm ">
            {dateBetween === 0
              ? "Vừa mới đăng bài"
              : `${dateBetween} thời gian trước`}
            <span className="ml-2"> {renderIconPrivacy}</span>
          </p>
        </div>
      </div>

      <div className="h-full flex items-center">
        {action ? action : <MoreHorizontal size={20} strokeWidth={1.25} />}
      </div>
    </div>
  );
};

HeaderPostUser.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default HeaderPostUser;

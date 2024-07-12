import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/select";
import { Earth, Group, LockKeyhole, User } from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export const PrivacyPost = {
  ALONE: 0,
  FOLLOWER: 1,
  EVERYONE: 2,
  GROUP: 3,
};

export const PrivacyPostLabel = {
  ALONE: "Chỉ mình tôi",
  FOLLOWER: "Người theo dõi",
  EVERYONE: "Mọi người",
  GROUP: "Nhóm",
};

export const genOptionsPrivacyPost = () => {
  return [
    {
      value: PrivacyPost.ALONE,
      label: PrivacyPostLabel.ALONE,
      icon: <LockKeyhole size={16} strokeWidth={1.25} />,
    },
    {
      value: PrivacyPost.FOLLOWER,
      label: PrivacyPostLabel.FOLLOWER,
      icon: <User size={20} strokeWidth={1.25} />,
    },
    {
      value: PrivacyPost.EVERYONE,
      label: PrivacyPostLabel.EVERYONE,
      icon: <Earth size={20} strokeWidth={1.25} />,
    },
    {
      value: PrivacyPost.GROUP,
      label: PrivacyPostLabel.GROUP,
      icon: <Group size={20} strokeWidth={1.25} />,
    },
  ];
};

const SelectPrivacyPost = ({
  loading,
  className,
  title,
  handleChange,
  values,
  setFieldValue,
}) => {
  // const options = genOptionsPrivacyPost();
  const { groupId } = useParams();

  const options = useMemo(() => {
    if (!groupId) {
      return genOptionsPrivacyPost().filter(
        (option) => option.value !== PrivacyPost.GROUP
      );
    }
    return genOptionsPrivacyPost().filter(
      (option) => option.value === PrivacyPost.GROUP
    );
  }, [groupId]);

  const handleChangeSelect = (e) => {
    handleChange((prev) => ({
      ...prev,
      privacy: e,
    }));
    setFieldValue("privacy", e);
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-3 items-center justify-between w-full",
        className
      )}
    >
      <p className="text-md">{title ? title : "Hãy chọn phạm vi"}</p>

      <Select
        onValueChange={handleChangeSelect}
        defaultValue={values}
        disabled={loading}
        id="privacy"
        name="privacy"
      >
        <SelectTrigger className="col-span-2">
          <SelectValue placeholder="Chọn phạm vi" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((label, i) => {
              return (
                <SelectItem
                  key={i}
                  className="text-sm gap-1 border-b border-black"
                  value={label.value}
                >
                  <div className="flex items-center w-full justify-between gap-2">
                    <p className="text-md font-quick_sans">{label.label}</p>
                    {label.icon}
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPrivacyPost;

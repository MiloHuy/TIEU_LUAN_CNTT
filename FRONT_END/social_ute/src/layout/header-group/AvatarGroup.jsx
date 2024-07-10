const AvatarGroup = ({ avatar }) => {
  return (
    <img
      loading="lazy"
      src={avatar}
      alt="img_group"
      className="w-full h-[50vh] object-fill"
    />
  );
};

export default AvatarGroup;

import CardBaseLayout from "combine/card-base/CardBaseLayout";

const GroupCard = ({ item, ...props }) => {
  return (
    <div
      className="flex justify-center text-sm text-black dark:text-white w-full"
      {...props}
    >
      <CardBaseLayout
        align="vertical"
        className="min-w-[300px] w-full items-center justify-between gap-4"
        header={
          <img
            src={item.avatar.url}
            className="w-20 h-20 rounded-full object-full"
            loading="lazy"
            alt="img"
          />
        }
        body={
          <div className="flex flex-col gap-2 h-full justify-center items-start cursor-pointer w-full">
            <p>{item.name}</p>

            <p className="uppercase">{"Nhóm công khai"}</p>
          </div>
        }
      />
    </div>
  );
};

export default GroupCard;

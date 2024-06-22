import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";
import { getFullName } from "utils/user.utils";

const MemberCard = ({ member, ...props }) => (
  <CardBaseLayout
    align="vertical"
    className="w-[400px] justify-between items-center"
    header={
      <img
        src={member.avatar.url}
        className="w-20 h-20 rounded-full object-cover"
        loading="lazy"
        alt="img"
      />
    }
    body={
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">
          {getFullName(member.first_name, member.last_name)}
        </h3>
        <p className="text-sm text-gray-400">{member.department}</p>
      </div>
    }
    footer={<Button className="p-4">Click me</Button>}
    {...props}
  />
);

export default MemberCard;

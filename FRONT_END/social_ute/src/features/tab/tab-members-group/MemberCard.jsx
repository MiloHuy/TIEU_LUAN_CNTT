import CardBaseLayout from "combine/card-base/CardBaseLayout";
import { Button } from "components/button";

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
        <h3 className="text-xl font-semibold">Nguyen Van A</h3>
        <p className="text-sm text-gray-400">20/10/2000</p>
      </div>
    }
    footer={<Button className="p-4">Click me</Button>}
    {...props}
  />
);

export default MemberCard

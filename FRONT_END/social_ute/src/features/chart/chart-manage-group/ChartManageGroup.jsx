import React, { useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useStatistic } from "hook/manage-group/useStatisticManage";

const chartData = [
  { statistic: "Thành viên", desktop: 186, mobile: 80 },
  { statistic: "Bài viết", desktop: 305, mobile: 200 },
  { statistic: "Bình luận", desktop: 237, mobile: 120 },
  { statistic: "Lượt xem", desktop: 400, mobile: 300 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const ChartManageGroup = ({ permission, role, groupId }) => {
  const {
    fetchStatisticMembersManage,
    fetchStatisticPostsManage,
    fetchStatisticLikesManage,
    fetchStatisticCommentsManage,
  } = useStatistic();

  useEffect(() => {
    fetchStatisticMembersManage(permission, role, groupId);
  }, [fetchStatisticMembersManage, permission, role, groupId]);

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="statistic"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default ChartManageGroup;

import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "components/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useStatistic } from "hook/manage-group/useStatisticManage";

const chartConfig = {
  desktop: {
    label: "Nhóm",
    color: "#2563eb",
  },
};

const ChartManageGroup = ({ permission, role, groupId }) => {
  const {
    fetchStatisticMembersManage,
    fetchStatisticPostsManage,
    fetchStatisticLikesManage,
    fetchStatisticCommentsManage,
    res: response,
  } = useStatistic();

  const [charData, setChartData] = useState([
    { statistic: "Thành viên", desktop: 186 },
    { statistic: "Bài viết", desktop: 305 },
    { statistic: "Bình luận", desktop: 237 },
    { statistic: "Lượt thích", desktop: 400 },
  ]);

  useEffect(() => {
    fetchStatisticMembersManage(permission, role, groupId);
    fetchStatisticPostsManage(permission, role, groupId);
    fetchStatisticLikesManage(permission, role, groupId);
    fetchStatisticCommentsManage(permission, role, groupId);
  }, [
    fetchStatisticPostsManage,
    permission,
    role,
    groupId,
    fetchStatisticMembersManage,
    fetchStatisticLikesManage,
    fetchStatisticCommentsManage,
  ]);

  useEffect(() => {
    setChartData([
      { statistic: "Thành viên", desktop: response.countMembers },
      { statistic: "Bài viết", desktop: response.countPosts },
      { statistic: "Bình luận", desktop: response.countComments },
      { statistic: "Lượt thích", desktop: response.countLikes },
    ]);
  }, [response]);

  return (
    <div className="flex flex-col gap-4">
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={charData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="statistic"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>

      <p>Số lượng thành viên trong nhóm: {response.countMembers}</p>
      <p>Số lượng bài viết trong nhóm: {response.countPosts}</p>
      <p>Số lượng yêu thích trong nhóm: {response.countLikes}</p>
      <p>Số lượng bình luận trong nhóm: {response.countComments}</p>
    </div>
  );
};

export default ChartManageGroup;

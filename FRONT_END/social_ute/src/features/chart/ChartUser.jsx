import { Select, SelectItem } from "@nextui-org/react";
import { Chart } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getStatisticsUser } from "services/admin.svc";

import { registerables } from 'chart.js';
import { monthYear } from "constants/month.const";
Chart.register(...registerables);

const ChartUser = () => {
    const [monthDay, setMonth] = useState(
        {
            "month": 12
        }
    )

    const [value, setValue] = useState(12);

    const handleSelectionChange = (e) => {
        setValue(e.target.value);
        setMonth({
            "month": e.target.value
        })
    };

    const [chart, setChart] = useState()
    const dataChart = []

    const fetchStatisticsUser = useCallback(async () => {
        try {
            const data_statistics = await getStatisticsUser(monthDay)

            console.log('data_statistics', data_statistics.data)

            const { posts_in_current_day, posts_in_current_month, posts_in_current_week, totals_accounts, total } = data_statistics.data

            dataChart.push(posts_in_current_day)
            dataChart.push(posts_in_current_month)
            dataChart.push(posts_in_current_week)
            dataChart.push(totals_accounts)
            dataChart.push(total)

            setChart(dataChart)
        }
        catch (err) {

        }
    }, [monthDay])

    useEffect(() => {
        fetchStatisticsUser()
    }, [fetchStatisticsUser])

    const labels = ["Số bài viết trong ngày", "Số bài viết trong tháng", "Số bài viết trong tuần", "Tổng số tài khoản", "Tất cả bài bài viết"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Thống kê ",
                backgroundColor: "rgb(88, 93, 86)",
                borderColor: "rgb(88, 93, 86)",
                data: chart ? chart : [],
                color: "rgb(221, 222, 221)"
            },
        ],
        options: {
            legend: {
                display: false //This will do the task
            }
        }
    };


    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-2 gap-3">
            <div className='w-full h-ull flex items-start'>
                <Select
                    placeholder="Hãy chọn tháng muốn xem"
                    label="Tháng"
                    variant="bordered"
                    radius="sm"
                    selectedKeys={[value]}
                    className="max-w-xs"
                    onChange={handleSelectionChange}

                    listboxProps={{
                        itemClasses: {
                            base: [
                                "rounded-md",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "data-[hover=true]:bg-default-100",
                                "dark:data-[hover=true]:bg-default-50",
                                "data-[selectable=true]:focus:bg-default-50",
                                "data-[pressed=true]:opacity-70",
                                "data-[focus-visible=true]:ring-default-500",
                            ],
                        },
                    }}

                    popoverProps={{
                        classNames: {
                            base: "before:bg-default-200",
                            content: "p-0 border-small border-divider bg-background",
                        },
                    }}

                >
                    {
                        monthYear.map((month) =>
                            <SelectItem key={month.value} value={month.value}>
                                {month.label}
                            </SelectItem>
                        )
                    }
                </Select>
            </div>
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>
                Thống kê dữ liệu - tháng {value}
            </h1>
            <Bar data={data} />
        </div>
    )
}

export default ChartUser

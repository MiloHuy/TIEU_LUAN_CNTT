import { Chart } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getStatisticsUser } from "services/admin.svc";

import { registerables } from 'chart.js';
Chart.register(...registerables);

const ChartUser = () => {
    const [monthDay, setMonth] = useState(
        {
            "month": 12
        }
    )

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
    }, [])

    useEffect(() => {
        fetchStatisticsUser()
    }, [fetchStatisticsUser])

    const labels = ["Số post trong ngày", "Số post trong tháng", "Số post trong tuần", "Tổng số tài khoản", "Tất cả bài post"];
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
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>
                Thống kê dữ liệu.
            </h1>
            <Bar data={data} />
        </div>
    )
}

export default ChartUser

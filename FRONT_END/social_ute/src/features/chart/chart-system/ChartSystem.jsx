import { Chart } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from 'react-toastify';
import { getStatisticsUser } from "services/admin.svc";

import { registerables } from 'chart.js';
Chart.register(...registerables);

const ChartSystem = () => {
    const monthCurrent = new Date()
    const [monthDay, setMonth] = useState(
        {
            "month": monthCurrent.getMonth() + 1
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

            const { posts_in_current_day, posts_in_current_month, posts_in_current_week, totals_accounts, total, totals_posts } = data_statistics.data

            dataChart.push(totals_posts)
            dataChart.push(totals_accounts)

            setChart(dataChart)
        }
        catch (err) {
            toast.error('Có lỗi trong hệ thống.', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [monthDay])

    useEffect(() => {
        fetchStatisticsUser()
    }, [fetchStatisticsUser])

    const labels = ["Tổng số bài viết", "Tổng số tài khoản"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Thống kê ",
                backgroundColor: "rgb(88, 93, 86)",
                borderColor: "rgb(88, 93, 86)",
                data: chart ? chart : [],
                color: "rgb(221, 222, 221)",
                borderRadius: '5'
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            }
        },
        scales: {
            x: {
                border: {
                    display: true
                },
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: 'rgb(0,0,0)'
                }
            },
            y: {
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                    color: 'rgb(255,255,255)'
                },
            }
        },
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center px-2 gap-3">
            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>
                Thống kê hệ thống
            </h1>

            <Bar data={data} options={options} />
        </div>
    )
}

export default ChartSystem

import { Chart } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from 'react-toastify';
import { getStatisticsUser } from "services/admin.svc";

import { registerables } from 'chart.js';
import DatePicker from "components/date-picker";
Chart.register(...registerables);

const ChartUserMonthDetail = () => {
    const date = new Date()
    const [valueDateTime, setValueDateTime] = useState({
        month: date.getMonth() + 1,
        year: date.getFullYear()
    })

    const handleChangeDateTime = (newValue) => {
        if (newValue) {
            console.log('New value: ', newValue)
            setValueDateTime(newValue)
        }
    }

    const [chart, setChart] = useState()
    const dataChart = []

    const fetchStatisticsUser = useCallback(async () => {
        try {
            const data_statistics = await getStatisticsUser(valueDateTime)

            const { total } = data_statistics.data

            dataChart.push(total)

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
    }, [valueDateTime])

    useEffect(() => {
        fetchStatisticsUser()
    }, [fetchStatisticsUser])

    const labels = ["Số bài viết trong tháng"];
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
            <div className='w-full h-full flex items-center justify-start'>
                <div className='w-1/2'>
                    <DatePicker
                        value={valueDateTime}
                        asSingle={true}
                        popoverDirection="down"
                        onChange={handleChangeDateTime}
                        onlyMonthAndYear
                    />
                </div>
            </div>

            <h1 className='text-lg text-black dark:text-white font-bold font-merriweather text-center'>
                Thống kê dữ liệu - tháng {valueDateTime.month}
            </h1>
            <Bar data={data} options={options} />
        </div>
    )
}

export default ChartUserMonthDetail

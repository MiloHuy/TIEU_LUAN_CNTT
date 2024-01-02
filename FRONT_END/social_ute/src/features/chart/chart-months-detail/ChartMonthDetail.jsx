import { Select, SelectItem } from "@nextui-org/react";
import { Chart } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from 'react-toastify';
import { getStatisticsUser } from "services/admin.svc";

import { registerables } from 'chart.js';
import { monthYear } from "constants/month.const";
Chart.register(...registerables);

const ChartUserMonthDetail = () => {
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
    }, [monthDay])

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
            <div className='w-full h-ull flex items-start'>
                <Select
                    placeholder="Hãy chọn tháng muốn xem"
                    label="Tháng"
                    variant="bordered"
                    radius="sm"
                    selectedKeys={[value]}
                    className="max-w-xs border border-black dark:border-white rounded-lg"
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
            <Bar data={data} options={options} />
        </div>
    )
}

export default ChartUserMonthDetail

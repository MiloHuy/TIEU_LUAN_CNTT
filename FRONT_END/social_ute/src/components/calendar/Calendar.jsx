import dayjs from "dayjs";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "utils/calendar.utils";
import cn from "utils/cn.utils";

const Calendar = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

    return (
        <div className="relative flex gap-10 justify-center mx-auto h-full sm:flex-row flex-col">
            <div className="w-[300px] h-[430px] grid grid-cols-1 items-center">
                <div className="flex justify-between items-center w-[300px]">
                    <h1 className="select-none font-semibold text-white">
                        {months[today.month()]}, {today.year()}
                    </h1>

                    <div className="flex gap-10 items-center">
                        <GrFormPrevious
                            color='#ffffff'
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1
                            className=" cursor-pointer hover:scale-105 transition-all text-white"
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                        <GrFormNext
                            color='#ffffff'
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-7 items-center justify-center w-full">
                        {days.map((day, index) => {
                            return (
                                <h1
                                    key={index}
                                    className="text-sm text-center text-white h-14 w-14 grid place-content-center select-none"
                                >
                                    {day}
                                </h1>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-7 items-center justify-center">
                    {generateDate(today.month(), today.year()).map(
                        ({ date, currentMonth, today }, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                                >
                                    <h1
                                        className={cn(
                                            currentMonth ? "" : "text-white",
                                            today
                                                ? "bg-red-600 text-white"
                                                : "",
                                            selectDate
                                                .toDate()
                                                .toDateString() ===
                                                date.toDate().toDateString()
                                                ? "bg-black text-white"
                                                : "",
                                            "h-10 w-10 text-white rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                        )}
                                        onClick={() => {
                                            setSelectDate(date);
                                        }}
                                    >
                                        {date.date()}
                                    </h1>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar

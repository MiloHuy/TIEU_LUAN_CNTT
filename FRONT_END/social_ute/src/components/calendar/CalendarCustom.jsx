import RoundedButton from "components/button/RoundedButton";
import { CALENDAR_SIZE } from "constants/date-time.const";

import DatepickerContext from "contexts/DatepickerContext";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { formatDate, getDaysInMonth, getFirstDayInMonth, getFirstDaysInMonth, getLastDaysInMonth, getNumberOfDay, loadLanguageModule, previousMonth } from "utils/helpers.utils";
import Months from "./Month";
import Years from "./Year";

const CalendarCustom = (
    {
        date,
        minDate,
        maxDate,
        onClickPrevious,
        onClickNext,
        changeMonth,
        changeYear
    }
) => {
    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const [year, setYear] = useState(date.year());

    const {
        i18n,
        startWeekOn,
        changeDatepickerValue
    } = useContext(DatepickerContext);
    loadLanguageModule(i18n);

    const previous = useCallback(() => {
        return getLastDaysInMonth(
            previousMonth(date),
            getNumberOfDay(getFirstDayInMonth(date).ddd, startWeekOn)
        );
    }, [date, startWeekOn]);

    const current = useCallback(() => {
        return getDaysInMonth(formatDate(date));
    }, [date]);

    const next = useCallback(() => {
        return getFirstDaysInMonth(
            previousMonth(date),
            CALENDAR_SIZE - (previous().length + current().length)
        );
    }, [current, date, previous]);

    const hideMonths = useCallback(() => {
        showMonths && setShowMonths(false);
    }, [showMonths]);

    const hideYears = useCallback(() => {
        showYears && setShowYears(false);
    }, [showYears]);

    const clickMonth = useCallback(
        (month) => {
            changeDatepickerValue({
                month: month,
                year: date.year()
            })

            setTimeout(() => {
                changeMonth(month);
                setShowMonths(!showMonths);
            }, 250);
        },
        [changeMonth, showMonths, date, changeDatepickerValue]
    );

    const clickYear = useCallback(
        (year) => {
            changeDatepickerValue({
                month: date.month() + 1,
                year: year
            })

            setTimeout(() => {
                changeYear(year);
                setShowYears(!showYears);
            }, 250);
        },
        [changeYear, showYears, date, changeDatepickerValue]
    );

    // UseEffects & UseLayoutEffect
    useEffect(() => {
        setYear(date.year());
    }, [date]);

    // Variables
    const calendarData = useMemo(() => {
        return {
            date: date,
            days: {
                previous: previous(),
                current: current(),
                next: next()
            }
        };
    }, [current, date, next, previous]);

    const minYear = useMemo(
        () => (minDate && dayjs(minDate).isValid() ? dayjs(minDate).year() : null),
        [minDate]
    );
    const maxYear = useMemo(
        () => (maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate).year() : null),
        [maxDate]
    );

    return (
        <div className="w-full md:w-[296px] md:min-w-[296px]">
            <div className="flex items-center space-x-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1.5">
                {!showMonths && !showYears && (
                    <div className="flex-none">
                        <RoundedButton roundedFull={true} onClick={onClickPrevious}>
                            <ChevronLeft size={20} strokeWidth={1} />
                        </RoundedButton>
                    </div>
                )}

                {showYears && (
                    <div className="flex-none">
                        <RoundedButton
                            roundedFull={true}
                            onClick={() => {
                                setYear(year - 12);
                            }}
                        >
                            <ChevronsLeft size={20} strokeWidth={1} />
                        </RoundedButton>
                    </div>
                )}

                <div className="flex flex-1 items-center space-x-1.5">
                    <div className="w-1/2">
                        <RoundedButton
                            onClick={() => {
                                setShowMonths(!showMonths);
                                hideYears();
                            }}
                        >
                            <>{calendarData.date.locale(i18n).format("MMM")}</>
                        </RoundedButton>
                    </div>

                    <div className="w-1/2">
                        <RoundedButton
                            onClick={() => {
                                setShowYears(!showYears);
                                hideMonths();
                            }}
                        >
                            <>{calendarData.date.year()}</>
                        </RoundedButton>
                    </div>
                </div>

                {showYears && (
                    <div className="flex-none">
                        <RoundedButton
                            roundedFull={true}
                            onClick={() => {
                                setYear(year + 12);
                            }}
                        >
                            <ChevronsRight size={20} strokeWidth={1} />
                        </RoundedButton>
                    </div>
                )}

                {!showMonths && !showYears && (
                    <div className="flex-none">
                        <RoundedButton roundedFull={true} onClick={onClickNext}>
                            <ChevronRight size={20} strokeWidth={1} />
                        </RoundedButton>
                    </div>
                )}
            </div>

            <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
                {showMonths && (
                    <Months currentMonth={calendarData.date.month() + 1} clickMonth={clickMonth} />
                )}

                {showYears && (
                    <Years
                        year={year}
                        minYear={minYear}
                        maxYear={maxYear}
                        currentYear={calendarData.date.year()}
                        clickYear={clickYear}
                    />
                )}

            </div>
        </div>
    )
}

export default CalendarCustom
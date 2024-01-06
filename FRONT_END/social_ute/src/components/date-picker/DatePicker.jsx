import CalendarCustom from "components/calendar/CalendarCustom";
import { COLORS, DEFAULT_COLOR } from "constants/date-picker.const";
import { DATE_FORMAT, LANGUAGE } from "constants/date-time.const";
import DatepickerContext from "contexts/DatepickerContext";
import dayjs from "dayjs";
import useOnClickOutside from "hook/useOnClickOutside";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatDate, nextMonth, previousMonth } from "utils/helpers.utils";
import { Arrow } from "./Arrow";
import Input from "./Input";

const Datepicker = ({
    primaryColor = "blue",
    value = null,
    onChange,
    onlyMonthAndYear = true,
    configs = undefined,
    asSingle = false,
    placeholder = null,
    separator = "~",
    startFrom = null,
    i18n = LANGUAGE,
    disabled = false,
    inputClassName = null,
    containerClassName = null,
    toggleClassName = null,
    toggleIcon = undefined,
    displayFormat = DATE_FORMAT,
    readOnly = false,
    minDate = null,
    maxDate = null,
    dateLooking = "forward",
    disabledDates = null,
    inputId,
    inputName,
    startWeekOn = "sun",
    classNames = undefined,
    popoverDirection = undefined
}) => {
    // Ref
    const containerRef = useRef(null);
    const calendarContainerRef = useRef(null);
    const arrowRef = useRef(null);

    // State
    const [firstDate, setFirstDate] = useState(
        startFrom && dayjs(startFrom).isValid() ? dayjs(startFrom) : dayjs()
    );

    const [secondDate, setSecondDate] = useState(nextMonth(firstDate));
    const [period, setPeriod] = useState({
        start: null,
        end: null
    });
    const [dayHover, setDayHover] = useState(null);
    const [inputText, setInputText] = useState("");
    const [inputRef, setInputRef] = useState();

    // Custom Hooks use
    useOnClickOutside(containerRef, () => {
        const container = containerRef.current;
        if (container) {
            hideDatepicker();
        }
    });

    // Functions
    const hideDatepicker = useCallback(() => {
        const div = calendarContainerRef.current;
        const arrow = arrowRef.current;
        if (arrow && div && div.classList.contains("block")) {
            div.classList.remove("block");
            div.classList.remove("translate-y-0");
            div.classList.remove("opacity-1");
            div.classList.add("translate-y-4");
            div.classList.add("opacity-0");
            setTimeout(() => {
                div.classList.remove("bottom-full");
                div.classList.add("hidden");
                div.classList.add("mb-2.5");
                div.classList.add("mt-2.5");
                arrow.classList.remove("-bottom-2");
                arrow.classList.remove("border-r");
                arrow.classList.remove("border-b");
                arrow.classList.add("border-l");
                arrow.classList.add("border-t");
            }, 300);
        }
    }, []);

    /* Start First */
    const firstGotoDate = useCallback(
        (date) => {
            const newDate = dayjs(formatDate(date));
            const reformatDate = dayjs(formatDate(secondDate));
            if (newDate.isSame(reformatDate) || newDate.isAfter(reformatDate)) {
                setSecondDate(nextMonth(date));
            }
            setFirstDate(date);
        },
        [secondDate]
    );

    const previousMonthFirst = useCallback(() => {
        setFirstDate(previousMonth(firstDate));
    }, [firstDate]);

    const nextMonthFirst = useCallback(() => {
        firstGotoDate(nextMonth(firstDate));
    }, [firstDate, firstGotoDate]);

    const changeFirstMonth = useCallback(
        (month) => {
            firstGotoDate(dayjs(`${firstDate.year()}-${month < 10 ? "0" : ""}${month}-01`));
        },
        [firstDate, firstGotoDate]
    );

    const changeFirstYear = useCallback(
        (year) => {
            firstGotoDate(dayjs(`${year}-${firstDate.month() + 1}-01`));
        },
        [firstDate, firstGotoDate]
    );
    /* End First */

    // UseEffects & UseLayoutEffect
    useEffect(() => {
        const container = containerRef.current;
        const calendarContainer = calendarContainerRef.current;
        const arrow = arrowRef.current;

        if (container && calendarContainer && arrow) {
            const detail = container.getBoundingClientRect();
            const screenCenter = window.innerWidth / 2;
            const containerCenter = (detail.right - detail.x) / 2 + detail.x;

            if (containerCenter > screenCenter) {
                arrow.classList.add("right-0");
                arrow.classList.add("mr-3.5");
                calendarContainer.classList.add("right-0");
            }
        }
    }, []);

    useEffect(() => {
        if (value && value.startDate && value.endDate) {
            const startDate = dayjs(value.startDate);
            const endDate = dayjs(value.endDate);
            const validDate = startDate.isValid() && endDate.isValid();
            const condition =
                validDate && (startDate.isSame(endDate) || startDate.isBefore(endDate));
            if (condition) {
                setPeriod({
                    start: formatDate(startDate),
                    end: formatDate(endDate)
                });
                setInputText(
                    `${formatDate(startDate, displayFormat)}${asSingle ? "" : ` ${separator} ${formatDate(endDate, displayFormat)}`
                    }`
                );
            }
        }

        if (value && onlyMonthAndYear && value.month && value.year) {
            setInputText(`Tháng: ${value.month} - Năm: ${value.year}`)
        }

        if (value && value.startDate === null && value.endDate === null) {
            setPeriod({
                start: null,
                end: null
            });
            setInputText("");
        }
    }, [asSingle, value, displayFormat, separator, onlyMonthAndYear]);

    useEffect(() => {
        if (startFrom && dayjs(startFrom).isValid()) {
            const startDate = value?.startDate;
            const endDate = value?.endDate;
            if (startDate && dayjs(startDate).isValid()) {
                setFirstDate(dayjs(startDate));
                if (!asSingle) {
                    if (
                        endDate &&
                        dayjs(endDate).isValid() &&
                        dayjs(endDate).startOf("month").isAfter(dayjs(startDate))
                    ) {
                        setSecondDate(dayjs(endDate));
                    } else {
                        setSecondDate(nextMonth(dayjs(startDate)));
                    }
                }
            } else {
                setFirstDate(dayjs(startFrom));
                setSecondDate(nextMonth(dayjs(startFrom)));
            }
        }
    }, [asSingle, startFrom, value]);

    // Variables
    const safePrimaryColor = useMemo(() => {
        if (COLORS.includes(primaryColor)) {
            return primaryColor;
        }
        return DEFAULT_COLOR;
    }, [primaryColor]);
    const contextValues = useMemo(() => {
        return {
            asSingle,
            primaryColor: safePrimaryColor,
            configs,
            calendarContainer: calendarContainerRef,
            arrowContainer: arrowRef,
            hideDatepicker,
            period,
            changePeriod: (newPeriod) => setPeriod(newPeriod),
            dayHover,
            changeDayHover: (newDay) => setDayHover(newDay),
            inputText,
            changeInputText: (newText) => setInputText(newText),
            updateFirstDate: (newDate) => firstGotoDate(newDate),
            changeDatepickerValue: onChange,
            placeholder,
            separator,
            i18n,
            value,
            disabled,
            inputClassName,
            containerClassName,
            toggleClassName,
            toggleIcon,
            readOnly,
            displayFormat,
            minDate,
            maxDate,
            dateLooking,
            disabledDates,
            inputId,
            inputName,
            startWeekOn,
            classNames,
            onChange,
            input: inputRef,
            popoverDirection
        };
    }, [
        asSingle,
        safePrimaryColor,
        configs,
        hideDatepicker,
        period,
        dayHover,
        inputText,
        onChange,
        placeholder,
        separator,
        i18n,
        value,
        disabled,
        inputClassName,
        containerClassName,
        toggleClassName,
        toggleIcon,
        readOnly,
        displayFormat,
        minDate,
        maxDate,
        dateLooking,
        disabledDates,
        inputId,
        inputName,
        startWeekOn,
        classNames,
        inputRef,
        popoverDirection,
        firstGotoDate
    ]);

    const containerClassNameOverload = useMemo(() => {
        const defaultContainerClassName = "relative w-full text-gray-700";
        return typeof containerClassName === "function"
            ? containerClassName(defaultContainerClassName)
            : typeof containerClassName === "string" && containerClassName !== ""
                ? containerClassName
                : defaultContainerClassName;
    }, [containerClassName]);

    return (
        <DatepickerContext.Provider value={contextValues}>
            <div className={containerClassNameOverload} ref={containerRef}>
                <Input setContextRef={setInputRef} />

                <div
                    className="transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden"
                    ref={calendarContainerRef}
                >
                    <Arrow ref={arrowRef} />

                    <div className="mt-2.5 shadow-sm border border-gray-300 px-1 py-0.5 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 rounded-lg">
                        <div className="flex flex-col lg:flex-row py-2">

                            <div
                                className={`flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 pr-2 lg:pr-1`}
                            >
                                <CalendarCustom
                                    date={firstDate}
                                    onClickPrevious={previousMonthFirst}
                                    onClickNext={nextMonthFirst}
                                    changeMonth={changeFirstMonth}
                                    changeYear={changeFirstYear}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DatepickerContext.Provider>
    );
};

export default Datepicker;
import RoundedButton from "components/button/RoundedButton";
import { MONTHS } from "constants/date-time.const";
import dayjs from "dayjs";

const Months = ({ currentMonth, clickMonth }) => {
    return (
        <div className="w-full grid grid-cols-2 gap-2 mt-2">
            {MONTHS.map(item => (
                <RoundedButton
                    key={item}
                    padding="py-3"
                    onClick={() => {
                        clickMonth(item);
                    }}
                    active={currentMonth === item}
                >
                    <>{dayjs(`2022-${item}-01`).format("MMM")}</>
                </RoundedButton>
            ))}
        </div>
    )
}

export default Months

import RoundedButton from "components/button/RoundedButton";
import { generateArrayNumber } from "utils/helpers.utils";

const Years = ({ year, currentYear, minYear, maxYear, clickYear }) => {
    let startDate = year;
    let endDate = year + 11;

    return (
        <div className="w-full grid grid-cols-2 gap-2 mt-2">
            {generateArrayNumber(startDate, endDate).map((item, index) => (
                <RoundedButton
                    key={index}
                    padding="py-3"
                    onClick={() => {
                        clickYear(item);
                    }}
                    active={currentYear === item}
                    disabled={
                        (maxYear !== null && item > maxYear) || (minYear !== null && item < minYear)
                    }
                >
                    <>{item}</>
                </RoundedButton>
            ))}
        </div>
    )
}

export default Years

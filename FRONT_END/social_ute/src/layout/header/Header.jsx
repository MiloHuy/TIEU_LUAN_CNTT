import { selectCurrenUser } from "app/slice/auth/auth.slice";
import clsx from "clsx";
import { useSelector } from 'react-redux';
import { getFullName } from "utils/user.utils";

const Header = (props) => {
    const { className } = props

    const user = useSelector(selectCurrenUser)

    const userName = getFullName(user.first_name, user.last_name)

    return (
        <div className={clsx("px-2", className)}>
            <p className="text-black dark:text-white font-nunito_sans text-lg text-center">
                Chào mừng {userName} đến với mạng xã hội cho sinh viên Sư Phạm Kỹ Thuật 😊😊😊
            </p>

        </div>
    )
}

export default Header

import { PropagateLoader } from "react-spinners"

const Loading = (props) => {
    const { darkmode } = props
    return (
        <PropagateLoader
            color='#000000'
            loading
            size={15}
            speedMultiplier={1}
        />
    )
}

export default Loading
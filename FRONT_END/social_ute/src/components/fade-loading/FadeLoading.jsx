import { createAnimation } from "utils/helpers/animation";
import { cssValue, parseLengthAndUnit } from "utils/helpers/unitConverter";

const fade = createAnimation("FadeLoader", "50% {opacity: 0.3} 100% {opacity: 1}", "fade");

function FadeLoader({
    loading = true,
    color = "#000000",
    speedMultiplier = 1,
    cssOverride = {},
    height = 15,
    width = 5,
    radius = 2,
    margin = 2,
    ...additionalprops
}) {
    const { value } = parseLengthAndUnit(margin);
    const radiusValue = value + 18;
    const quarter = radiusValue / 2 + radiusValue / 5.5;

    const wrapper = {
        display: "inherit",
        position: "relative",
        fontSize: "0",
        top: radiusValue,
        left: radiusValue,
        width: `${radiusValue * 3}px`,
        height: `${radiusValue * 3}px`,
        ...cssOverride,
    };

    const style = (i) => {
        return {
            position: "absolute",
            width: cssValue(width),
            height: cssValue(height),
            margin: cssValue(margin),
            backgroundColor: color,
            borderRadius: cssValue(radius),
            transition: "2s",
            animationFillMode: "both",
            animation: `${fade} ${1.2 / speedMultiplier}s ${i * 0.12}s infinite ease-in-out`,
        };
    };

    const a = {
        ...style(1),
        top: `${radiusValue}px`,
        left: "0",
    };
    const b = {
        ...style(2),
        top: `${quarter}px`,
        left: `${quarter}px`,
        transform: "rotate(-45deg)",
    };
    const c = {
        ...style(3),
        top: "0",
        left: `${radiusValue}px`,
        transform: "rotate(90deg)",
    };
    const d = {
        ...style(4),
        top: `${-1 * quarter}px`,
        left: `${quarter}px`,
        transform: "rotate(45deg)",
    };
    const e = {
        ...style(5),
        top: `${-1 * radiusValue}px`,
        left: "0",
    };
    const f = {
        ...style(6),
        top: `${-1 * quarter}px`,
        left: `${-1 * quarter}px`,
        transform: "rotate(-45deg)",
    };
    const g = {
        ...style(7),
        top: "0",
        left: `${-1 * radiusValue}px`,
        transform: "rotate(90deg)",
    };
    const h = {
        ...style(8),
        top: `${quarter}px`,
        left: `${-1 * quarter}px`,
        transform: "rotate(45deg)",
    };

    if (!loading) {
        return null;
    }

    return (
        <span style={wrapper} {...additionalprops}>
            <span style={a} />
            <span style={b} />
            <span style={c} />
            <span style={d} />
            <span style={e} />
            <span style={f} />
            <span style={g} />
            <span style={h} />
        </span>
    );
}

export default FadeLoader;

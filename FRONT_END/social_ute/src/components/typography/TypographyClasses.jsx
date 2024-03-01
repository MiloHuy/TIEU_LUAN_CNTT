import { generateUtilityClass, generateUtilityClasses } from "./utils";

export function getTypographyUtilityClass(slot) {
    return generateUtilityClass('Typography-Custom', slot);
}

const typographyClasses = generateUtilityClasses('Typography-Custom', [
    'root',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'inherit',
    'button',
    'caption',
    'overline',
    'alignLeft',
    'alignRight',
    'alignCenter',
    'alignJustify',
    'noWrap',
    'gutterBottom',
    'paragraph',
]);

export default typographyClasses;
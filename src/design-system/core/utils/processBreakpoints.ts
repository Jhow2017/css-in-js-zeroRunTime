import { Breakpoints, breakpoints } from 'ds/design-system/config';

export const processBreakpoints = (
    value: string | Breakpoints<string>,
    property: string
) => {
    if (typeof value === 'string') {
        return `${property}: ${value};`;
    }
    let css = '';
    for (const key in value) {
        if (value.hasOwnProperty(key) && key in breakpoints) {
            css += `@media (min-width: ${
                breakpoints[key as keyof typeof breakpoints]
            }) { ${property}: ${value[key as keyof Breakpoints<string>]}; }`;
        }
    }
    return css;
};

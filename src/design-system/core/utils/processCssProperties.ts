import { processBreakpoints } from './processBreakpoints';

const camelToKebab = (str: string) => {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
};

export const processCssProperties = (props: Record<string, any>) => {
    let cssString = '';
    for (const key in props) {
        if (['as', 'children'].includes(key)) {
            continue;
        }

        const value = props[key];
        if (typeof value === 'string' || typeof value === 'number') {
            cssString += `${camelToKebab(key)}: ${value};`;
        } else if (typeof value === 'object') {
            cssString += processBreakpoints(value, camelToKebab(key));
        }
    }
    return cssString;
};

import { Breakpoints } from 'ds/design-system/config';
import { getBreakpointMinWidth } from './getBreakpointMinWidth';

export const processCustomCssBreakpoints = (
    breakpoints: Breakpoints<string>
) => {
    return Object.entries(breakpoints)
        .map(([breakpoint, css]) => {
            const minWidth = getBreakpointMinWidth(breakpoint);
            return `@media (min-width: ${minWidth}) { ${css} }`;
        })
        .join(' ');
};

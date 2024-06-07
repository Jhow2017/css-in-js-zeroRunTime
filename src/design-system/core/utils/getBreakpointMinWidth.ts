const breakpointMinWidths: Record<string, string> = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
};

export const getBreakpointMinWidth = (breakpoint: string) => {
    return breakpointMinWidths[breakpoint] || breakpoint;
};

export const breakpoints = {
    sm: '0',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
};
export interface Breakpoints<T> {
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
}

export const formatCss = (css: string): string => {
    const formattedCss = css
        .split(';')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => `    ${line};`)
        .join('\n');
    return formattedCss;
};

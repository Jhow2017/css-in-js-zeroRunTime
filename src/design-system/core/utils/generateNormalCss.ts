import { CSSProperties } from 'react';

export const generateNormalCss = (props: CSSProperties) => {
    return Object.entries(props)
        .map(([key, value]) => {
            const kebabKey = key.replace(
                /([A-Z])/g,
                (match) => `-${match.toLowerCase()}`
            );
            return `${kebabKey}: ${value};`;
        })
        .join(' ');
};

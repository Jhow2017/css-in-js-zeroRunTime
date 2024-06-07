import { CSSProperties } from 'react';
import { Breakpoints } from 'ds/design-system/config';

export type CSSPropertiesBase = {
    [Property in keyof CSSProperties]?:
        | CSSProperties[Property]
        | Breakpoints<CSSProperties[Property]>;
};

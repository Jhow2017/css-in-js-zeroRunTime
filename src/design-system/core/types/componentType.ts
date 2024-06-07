import { CSSProperties, ElementType, ReactNode, Ref } from 'react';
import { Breakpoints } from 'ds/design-system/config';
import { CSSPropertiesBase } from './cssPropertiesBase';

type ComponentType = {
    ref?: Ref<any>;
    children?: ReactNode;
    forwardedRef?: Ref<any>;
    as?: ElementType;
    _hover?: CSSProperties;
    _focus?: CSSProperties;
    _css?: Breakpoints<string>;
    _styles?: Breakpoints<string>;
    css?: string;
} & CSSPropertiesBase;

export type { ComponentType };

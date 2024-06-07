import { ComponentType } from 'ds/design-system/core/types/componentType';
import { ReactNode } from 'react';

export type DsFlexType = {
    children?: ReactNode;
    onClick?: () => void;
} & ComponentType;

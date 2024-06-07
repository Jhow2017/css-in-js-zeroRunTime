import { ComponentType } from 'ds/design-system/core/types/componentType';
import { ReactNode } from 'react';

export type DsBoxType = {
    children?: ReactNode;
    onMouseEnter?: React.MouseEventHandler<HTMLTextAreaElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLTextAreaElement>;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
} & ComponentType;

import { CSSProperties, ElementType, ReactNode } from 'react';
import styled, { css as cssValidate } from '../../../utils/styled';

// utils
import { processCssProperties } from 'ds/design-system/core/utils/processCssProperties';
import { processCustomCssBreakpoints } from 'ds/design-system/core/utils/processCustomCssBreakpoints';
import { generateNormalCss } from 'ds/design-system/core/utils/generateNormalCss';
import { Breakpoints } from 'ds/design-system/config';
import { CSSPropertiesBase } from '../types/cssPropertiesBase';

export interface BaseStyleProps extends CSSPropertiesBase {
    as?: ElementType;
    _hover?: CSSProperties;
    _focus?: CSSProperties;
    css?: string;
    _css?: Breakpoints<string>;
    _styles?: CSSProperties;
    children?: ReactNode;
}

const BaseStyle = styled('div')<BaseStyleProps>`
    ${(_styles) =>
        _styles &&
        cssValidate`
           ${processCssProperties(_styles)}
    `}

    ${({ css }) =>
        css &&
        cssValidate`
            ${css}
        `}

    ${({ _css }) =>
        _css &&
        cssValidate`
            ${processCustomCssBreakpoints(_css)}
        `}

    ${({ _hover }) =>
        _hover &&
        cssValidate`
            &:hover {
                ${generateNormalCss(_hover)}
            }
    `}

    ${({ _focus }) =>
        _focus &&
        cssValidate`
            &:focus {
                ${generateNormalCss(_focus)}
            }
    `}
`;

export default BaseStyle;

import BaseStyle from 'ds/design-system/core/styles';
import React, { ElementType, ReactNode, forwardRef } from 'react';

import { removeAttributesFromDom } from '../removeAttributesFromDom';

import { ComponentType } from '../../types/componentType';

const ComponentMounter = forwardRef<HTMLElement, ComponentType>(
    (props, ref) => {
        const { children, _styles, as, _hover, _focus, css, _css, ...rest } =
            props;

        return (
            <BaseStyle
                as={as as ElementType}
                ref={ref}
                _styles={{ ..._styles, ...rest }}
                _css={_css}
                _hover={_hover}
                _focus={_focus}
                css={css}
                {...removeAttributesFromDom(props)}
            >
                {children}
            </BaseStyle>
        );
    }
);

export default ComponentMounter;

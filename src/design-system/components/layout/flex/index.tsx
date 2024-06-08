import { forwardRef } from 'react';

// types
import type { DsFlexType } from './types';

//ds
import ComponentMounter from 'ds/design-system/core/utils/component-mounter';

const DsFlex: React.FC<DsFlexType> = (
    {
        children,
        display,
        alignItems,
        justifyContent,
        flexWrap,
        flexDirection,
        ...attr
    },
    ref
) => {
    return (
        <ComponentMounter
            display={display || 'flex'}
            alignItems={alignItems}
            justifyContent={justifyContent}
            flexWrap={flexWrap}
            flexDirection={flexDirection}
            as={attr.as || 'div'}
            ref={ref}
            {...attr}
        >
            {children}
        </ComponentMounter>
    );
};

export default DsFlex;

import { forwardRef } from 'react';
import type { DsBoxType } from './types';
import ComponentMounter from 'ds/design-system/core/utils/component-mounter';

const DsBox: React.FC<DsBoxType> = ({ children, ...attr }, ref) => {
    return (
        <ComponentMounter as={attr.as || 'div'} ref={ref} {...attr}>
            {children}
        </ComponentMounter>
    );
};

export default DsBox;

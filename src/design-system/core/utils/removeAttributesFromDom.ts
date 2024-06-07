export const removeAttributesFromDom = (props: any) => {
    const cleanProps: any = {};
    Object.keys(props).forEach((key) => {
        if (
            !['as', 'children', '_hover', '_focus', '_css', 'css'].includes(key)
        ) {
            cleanProps[key] = props[key];
        }
    });
    return cleanProps;
};

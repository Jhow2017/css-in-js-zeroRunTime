import React from 'react';
import DsBox from 'ds/design-system/components/layout/box';

export default async function Home() {
    return (
        <DsBox
            background={{ sm: 'red', md: 'green', lg: 'yellow' }}
            display="flex"
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'100vh'}
            // _hover={{
            //     backgroundColor: 'green',
            // }}
            // _focus={{
            //     backgroundColor: 'white',
            // }}
            //css={'background-color: black;'}
            // _css={{
            //     sm: 'background-color: yellow;',
            // }}
        >
            Ola
        </DsBox>
    );
}

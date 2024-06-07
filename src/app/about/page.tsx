import React from 'react';

import DsBox from 'ds/design-system/components/layout/box';

interface User {
    id: number;
    name: string;
    email: string;
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
};

export default async function About() {
    const data = await fetchUsers();

    return (
        <DsBox
            as="main"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            padding="10px"
            margin="0"
            width="100%"
            height="100vh"
            color="white"
            background={{ sm: 'yellow', md: 'green', lg: 'red' }}
        >
            {data?.map((user) => (
                <DsBox
                    key={user.id}
                    as="p"
                    color="black"
                    _hover={{
                        background: 'red',
                        cursor: 'pointer',
                        //padding: '10px',
                    }}
                    _focus={{
                        background: 'yellow',
                    }}
                >
                    {user.name} ({user.email})
                </DsBox>
            ))}
        </DsBox>
    );
}

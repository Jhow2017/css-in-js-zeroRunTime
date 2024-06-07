import React, { CSSProperties, ElementType, ReactNode } from 'react';
import { createCssClass } from '../../utils/styleExtractor';

interface BoxProps extends CSSProperties {
    as?: ElementType;
    children?: ReactNode;
    _hover?: CSSProperties;
    _focus?: CSSProperties;
}

const Box: React.FC<BoxProps> = ({
    as: Component = 'div',
    children,
    _hover,
    _focus,
    ...props
}) => {
    const className = createCssClass({ ...props, _hover, _focus });

    return <Component className={className}>{children}</Component>;
};

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
        <Box
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
            background="green"
        >
            {data?.map((user) => (
                <Box
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
                </Box>
            ))}
        </Box>
    );
}

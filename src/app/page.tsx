import React from 'react';
import Button from '../components/Button';

export default async function Home() {
    return (
        <div>
            <Button as="a" primary={true}>
                Primary Button
            </Button>
            <Button>Secondary Button</Button>
            <Button disabled={true}>Disabled Button</Button>
        </div>
    );
}

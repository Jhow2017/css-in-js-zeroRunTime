import styled, { css } from '../utils/styled';

interface ButtonProps {
    primary?: boolean;
    disabled?: boolean;
}

const Button = styled('div')<ButtonProps>`
    background-color: ${(props) => (props.primary ? 'blue' : 'red')};
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    ${({ disabled }) =>
        disabled &&
        css`
            background-color: gray;
            cursor: not-allowed;
        `}

    @media (max-width: 768px) {
        background-color: green;
    }

    &:hover {
        background-color: ${(props) =>
            props.primary ? 'darkblue' : 'darkred'};
    }
`;

export default Button;

import React from 'react';

export type LogoVariant = 'bolt';

interface LogoProps {
    variant?: LogoVariant;
    className?: string;
    size?: number;
    color?: string;
}

const Logo: React.FC<LogoProps> = ({
    variant = 'bolt',
    className = "",
    size = 32,
    color = "currentColor"
}) => {
    switch (variant) {
        case 'bolt':
            return (
                <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                    <path d="M40 10L25 55H45L35 90L75 40H55L65 10H40Z" fill={color} />
                </svg>
            );
        default:
            return null;
    }
};

export default Logo;

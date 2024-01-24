import { CSSProperties } from 'react';

interface IChristSVGProps {
    color?: string;
    hoverColor?: string;
    isHovered?: boolean;
}

export const ChristSVG = ({ color, hoverColor, isHovered = false }: IChristSVGProps) => {
    console.log(isHovered);

    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.337954 0.337954C0.788559 -0.112651 1.51913 -0.112651 1.96974 0.337954L5.00002 3.36823L8.03026 0.337985C8.48087 -0.11262 9.21144 -0.11262 9.66205 0.337985C10.1127 0.78859 10.1127 1.51917 9.66205 1.96977L6.6318 5.00002L9.66201 8.03023C10.1126 8.48084 10.1126 9.21141 9.66201 9.66202C9.21141 10.1126 8.48083 10.1126 8.03023 9.66202L5.00002 6.6318L1.96977 9.66205C1.51917 10.1127 0.788592 10.1127 0.337987 9.66205C-0.112618 9.21144 -0.112618 8.48087 0.337987 8.03026L3.36823 5.00002L0.337954 1.96974C-0.112651 1.51913 -0.112651 0.788559 0.337954 0.337954Z"
                fill={isHovered ? hoverColor : color}
            />
        </svg>
    );
};

interface IProps {
    type: Types.Bank.TariffType;
    witdh?: number;
    height?: number;
}

export const Card = ({ type, witdh = 33, height = 32 }: IProps) => {
    return (
        <svg
            width={witdh}
            height={height}
            viewBox={`0 0 ${witdh} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask
                id="mask0_1802_1595"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="2"
                y="6"
                width="29"
                height="20"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.5 11.3333C2.5 8.38781 4.88781 6 7.83333 6H24.5L19.1667 26H2.5V11.3333ZM8.5 19.3333C7.02724 19.3333 5.83333 20.5272 5.83333 22H10.5C11.9728 22 13.1667 20.8061 13.1667 19.3333H8.5Z"
                    fill="black"
                />
                <path
                    d="M24.5003 6H30.5003V20.6667C30.5003 23.6121 28.1125 26 25.167 26H19.167L24.5003 6Z"
                    fill="url(#paint0_linear_1802_1595)"
                />
            </mask>
            <g mask="url(#mask0_1802_1595)">
                <path
                    d="M32.5 0H0.5V32H32.5V0Z"
                    fill={
                        type === 'TARIFF_CLASSIC'
                            ? '#3984F4'
                            : type === 'TARIFF_GOLD'
                            ? '#EEB200'
                            : type === 'TARIFF_PLATINUM'
                            ? '#747B8F'
                            : '#4972CF'
                    }
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_1802_1595"
                    x1="19.8337"
                    y1="8"
                    x2="30.8009"
                    y2="26.1263"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopOpacity="0.5" />
                    <stop offset="1" stopOpacity="0.3" />
                </linearGradient>
            </defs>
        </svg>
    );
};

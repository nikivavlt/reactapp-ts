import './Button.scss';

export interface IButtonProps {
	text: string;
	color: 'brown' | 'yellow';
	onClick: () => void;
	style?: React.CSSProperties;
	hovered?: boolean;
	unactive?: boolean;
}

export const Button = ({ text, color, hovered = false, onClick, style, unactive }: IButtonProps) => {
	return (
		<div
			style={{ ...style }}
			className={`g-components__button ${color === 'brown' ? `g-components__button_brown` : `g-components__button_yellow`} ${
				unactive ? 'g-components__button_unactive' : ''
			}`}
			onClick={() => onClick()}
		>
			{text}
		</div>
	);
};

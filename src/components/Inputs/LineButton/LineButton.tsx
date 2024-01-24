import './LineButton.scss';

export interface ILineButtonProps {
	text: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

export const LineButton = ({ text, style, onClick }: ILineButtonProps) => {
	return (
		<p style={style} className="g-components__line-button" onClick={() => onClick && onClick()}>
			{text}
		</p>
	);
};

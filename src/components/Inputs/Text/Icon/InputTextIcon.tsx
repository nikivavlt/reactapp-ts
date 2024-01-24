import './InputTextIcon.scss';

export interface IInputTextIconProps {
	icon: string;
	onClick?: () => void;
}

export const InputTextIcon = ({ icon, onClick }: IInputTextIconProps) => {
	return (
		<div className="g-components__input-text-icon" onClick={onClick}>
			<img src={icon} alt="" />
		</div>
	);
};

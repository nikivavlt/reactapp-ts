import { useState } from 'react';
import { IInputTextIconProps, InputTextIcon } from './Icon/InputTextIcon';

import './InputText.scss';

export interface IInputTextProps {
	style?: React.CSSProperties | undefined;
	name?: string;
	id?: string;
	placeholder?: string;
	type?: 'text' | 'password';
	icons?: IInputTextIconProps[];
	isValid?: boolean;
	value: string;
	onChange: (value: string) => void;
}

export const InputText = ({
	style,
	name = '',
	id = '',
	placeholder = '',
	type = 'text',
	icons = [],
	isValid = true,
	value,
	onChange
}: IInputTextProps) => {
	const [focused, setFocused] = useState(false);

	return (
		<div
			style={{ ...style, borderColor: isValid ? 'rgba(255, 250, 239, 0.05)' : 'rgb(166, 29, 29, .5)' }}
			className={`g-components__input-text ${focused ? 'g-components__input-text_active' : ''}`}
		>
			<input
				className="g-components__input-text__input"
				value={value}
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
				onChange={(ev) => onChange(ev.target.value)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			<div className="g-components__input-text__icons">
				{icons.map((x) => (
					<InputTextIcon key={x.icon} icon={x.icon} onClick={x.onClick} />
				))}
			</div>
		</div>
	);
};

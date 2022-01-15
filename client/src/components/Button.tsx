import React from 'react';
import LoadingIcon from './LoadingIcon';
import cx from 'classnames';
import styles from './Button.css';

export interface IButtonProps {
	className?: string;
	onClick?(): void;
	children?: React.ReactNode;
	isDisabled?: boolean;
	isProcessing?: boolean;
}

export default function Button({
	className,
	onClick,
	children,
	isDisabled,
	isProcessing
}: IButtonProps) {
	return (
		<button
			{...{onClick}}
			className={cx(styles.button, styles.primary, className)}
			disabled={isDisabled}>
			<div className={cx({ [styles.processing]: isProcessing })}>{children}</div>
			{isProcessing &&
				<LoadingIcon />
			}
		</button>
	);
}

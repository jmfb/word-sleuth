import React from 'react';
import { Button } from '~/components';
import styles from './ErrorView.css';

export interface IErrorViewProps {
	action?: string;
	context?: string;
	message?: string;
	onClickDismiss(): void;
}

export default function ErrorView({
	action,
	context,
	message,
	onClickDismiss
}: IErrorViewProps) {
	return (
		<main className={styles.root}>
			<section>
				<h1>Error - {action}</h1>
				<div className={styles.row}>
					<div className={styles.reason}>
						This error may be due to your session being out of date.<br />
						You can dismiss this error or try signing in again.
					</div>
					<div className={styles.actions}>
						<Button
							className={styles.action}
							onClick={onClickDismiss}>
							Dismiss
						</Button>
						<a href='/sign-in' className={styles.signIn}>Sign In</a>
					</div>
				</div>
				<div className={styles.message}>
					{message}
				</div>
				{context &&
					<div className={styles.context}>
						{context}
					</div>
				}
			</section>
		</main>
	);
}

import React from 'react';
import styles from './Statistic.css';

export interface IStatisticProps {
	value: number;
	label: string;
}

export default function Statistic({
	value,
	label
}: IStatisticProps) {
	return (
		<div className={styles.root}>
			<div className={styles.value}>{value}</div>
			<div>{label}</div>
		</div>
	);
}

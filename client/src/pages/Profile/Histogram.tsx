import React from 'react';
import cx from 'classnames';
import styles from './Histogram.css';

export interface IHistogramProps {
	count: number;
	wins: number;
	maxWins: number;
}

export default function Histogram({
	count,
	wins,
	maxWins
}: IHistogramProps) {
	const flexBasis = maxWins === 0 ?
		0 :
		Math.round((wins / maxWins) * 100);

	return (
		<div className={styles.root}>
			<div className={styles.count}>{count}</div>
			<div
				className={cx(styles.games, { [styles.wins]: wins > 0 })}
				style={{
					flexBasis: `${flexBasis}%`
				}}>
				{wins}
			</div>
		</div>
	);
}

import React from 'react';
import Histogram from './Histogram';
import styles from './Distribution.css';

export interface IDistributionProps {
	winsByGuessCount: Record<number, number>;
}

export default function Distribution({
	winsByGuessCount
}: IDistributionProps) {
	const guessCounts = new Array(6).fill(0).map((value, index) => index + 1);
	const wins = guessCounts.map(count => winsByGuessCount[count]);
	const maxWins = Math.max(...wins);

	return (
		<div className={styles.root}>
			{guessCounts.map(count =>
				<Histogram
					key={count}
					{...{count, maxWins}}
					wins={winsByGuessCount[count]}
					/>
			)}
		</div>
	);
}

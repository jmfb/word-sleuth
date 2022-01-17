import React from 'react';
import Statistic from './Statistic';
import Distribution from './Distribution';
import { IStatistics } from '~/models';
import styles from './Profile.css';

export interface IProfileProps {
	statistics: IStatistics;
}

export default function Profile({
	statistics
}: IProfileProps) {
	const {
		gamesPlayed,
		gamesWon,
		currentStreak,
		longestStreak,
		winsByGuessCount
	} = statistics;

	const winPercentage = gamesPlayed === 0 ?
		0 :
		Math.round((gamesWon / gamesPlayed) * 100);

	return (
		<div>
			<h1>Statistics</h1>
			<div className={styles.statistics}>
				<Statistic value={gamesPlayed} label='Played' />
				<Statistic value={winPercentage} label='Win %' />
				<Statistic value={currentStreak} label='Current Streak' />
				<Statistic value={longestStreak} label='Max Streak' />
			</div>

			<div className={styles.distribution}>
				<h2>Guess Distribution</h2>
				{gamesPlayed === 0 ?
					<div>No Data</div> :
					<Distribution {...{winsByGuessCount}} />
				}
			</div>
		</div>
	);
}

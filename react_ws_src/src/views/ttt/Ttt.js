import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import SetName from './SetName'
import SetGameType from './SetGameType'
import GameMain from './GameMain'
import { useAppContext } from '../../context/AppContext'

const Ttt = () => {
	const [ appState, updateAppState ] = useAppContext()
	const [gameType, setGameType] = useState(null)
	const [gameStep, setGameStep] = useState('set_name')

	// Function to determine the current step based on context and local state
	const determineGameStep = () => {
		if (!appState.curr_user || !appState.curr_user.name) {
			return 'set_name'
		} else if (!gameType) {
			return 'set_game_type'
		} else {
			return 'start_game'
		}
	}

	// Save the user's name into the context, then update the game step
	const saveUserName = (n) => {
		updateAppState({ curr_user: { name: n } })
		setGameStep(determineGameStep())
	}

	// Save the selected game type and update the game step
	const saveGameType = (t) => {
		setGameType(t)
		setGameStep(determineGameStep())
	}

	// Called when the game ends; resets gameType and updates the step
	const gameEnd = () => {
		setGameType(null)
		setGameStep(determineGameStep())
	}

	// Update the game step when the context's curr_user or gameType changes.
	useEffect(() => {
		setGameStep(determineGameStep())
	}, [appState.curr_user, gameType])

	return (
		<section id="TTT_game">
			<div id="page-container">
				{gameStep === 'set_name' && <SetName onSetName={saveUserName} />}
				{gameStep !== 'set_name' && (
					<div>
						<h2>Welcome, {appState.curr_user && appState.curr_user.name}</h2>
					</div>
				)}
				{gameStep === 'set_game_type' && <SetGameType onSetType={saveGameType} />}
				{gameStep === 'start_game' && (
					<GameMain game_type={gameType} onEndGame={gameEnd} />
				)}
			</div>
		</section>
	)
}

Ttt.propTypes = {
  params: PropTypes.any,
}

export default Ttt

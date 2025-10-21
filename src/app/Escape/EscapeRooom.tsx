'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import CodeEditor from './CodeEditor';
import { TASKS, Task } from './Tasks'; // Corrected path
import Style from './EscapeRoom.module.css'; // Corrected path
import { transform } from 'next/dist/build/swc/generated-native';

type TaskWithStatus = Task & { solved: boolean };

// --- Helper Functions ---

/**
 * Shuffles an array in place and returns a new array of a specified size.
 * @param array The array to shuffle.
 * @param size The number of elements to return.
 * @returns A new array with `size` random elements.
 */
function getRandomTasks<T>(array: T[], size: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}

const GAME_DURATION_SECONDS = 45 * 60; // 45 minutes

// --- Component ---

export default function EscapeRoom() {
    const [gameTasks, setGameTasks] = useState<TaskWithStatus[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION_SECONDS);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [userCode, setUserCode] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [keys, setKeys] = useState<string[]>([]);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
    const [currentView, setCurrentView] = useState<'room' | 'task'>('room');
    const [chestKey, setChestKey] = useState(false);
    const [password, setPassword] = useState(false)

    const startGame = useCallback(() => {
        const newTasks = getRandomTasks(TASKS, 4).map(task => ({ ...task, solved: false }));
        setGameTasks(newTasks);
        setCurrentTaskIndex(0);
        setTimeLeft(GAME_DURATION_SECONDS);
        setKeys([]);
        setFeedback('');
        setGameState('playing');
        setCurrentView('room');
        setIsActive(true);
        setChestKey(false)
        setPassword(false)
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && gameTasks.length > 0) {
            setUserCode(gameTasks[currentTaskIndex]?.starterCode || '');
        }
    }, [currentTaskIndex, gameTasks, gameState]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setIsActive(false);
            setGameState('lost');
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, gameState]);

    const handleCodeSubmit = () => {
        const currentTask = gameTasks[currentTaskIndex];
        if (currentTask.validate(userCode)) {
            const updatedTasks = [...gameTasks];
            updatedTasks[currentTaskIndex].solved = true;
            setGameTasks(updatedTasks);

            const newKeys = [...keys, `key-color-${keys.length}`]; 
            setKeys(newKeys);
            setFeedback('Correct! You received a key.');

            // Always go back to the room after a correct submission
            setCurrentView('room');

            // Check for win condition after returning to the room
            if (updatedTasks.every(t => t.solved)) {
              setGameState('won');
              setIsActive(false);
            }
        } else {
            setFeedback('Incorrect solution. Try again!');
        }
    };

    const handleChestClick = () => {
        if (gameTasks[1]?.solved) return; // Don't do anything if the task is already solved

        if (chestKey) {
            handleSelectTask(1);
        } else {
            alert('The chest is locked. You might need a key.');
        }
    };

    const handleComputerClick = () => {
        if (gameTasks[0]?.solved) return; // Don't do anything if the task is already solved

        if (password) {
            handleSelectTask(0);
        } else {
            alert('The Computer needs a password');
        }
    };

    const handleCubeClick = () => {
        if (!chestKey) {
            setChestKey(true);
            alert('You find a large ornate key!');
        }
        else{
            alert('I already found this. I wonder what it unlocks...')
        }
    };
    
    const handleDrawerClick = () => {
        if (!password) {
            setPassword(true);
            alert(`        You find a note!       \n
                Username:  Learning_JavaScript\n
                Password:  Password123\n\n
                I don't think they paid attention in Cybersecurity 101...`);
        }
        else{
            alert('I already searched this drawer')
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelectTask = (index: number) => {
        setCurrentTaskIndex(index);
        setCurrentView('task');
    };

    const currentTask = gameTasks[currentTaskIndex];

    if (gameState === 'idle') {
        return (
            <div className={Style.card}>
                <h2 className={Style.IdleHeader}>Welcome to the Coding Escape Room!</h2>
                <p className={Style.description}>You have 45 minutes to solve 4 JavaScript challenges to escape.</p>
                <button className={`${Style.playButton}`} onClick={startGame}>Start Game</button>
            </div>
        );
    }

    if (gameState === 'won') {
        const timeTaken = GAME_DURATION_SECONDS - timeLeft;
        return (
            <div className={Style.card}>
                <h2>Congratulations! You've Escaped!</h2>
                <p>Total time taken: {formatTime(timeTaken)}</p> 
                <button  className={`${Style.againButton} ${Style.button}`} onClick={startGame}>Play Again</button>
            </div>
        );
    }

    if (gameState === 'lost') {
        return (
            <div className={Style.card}>
                <h2 className={Style.center}
                >Time's Up!</h2>
                <p className={Style.center}>You didn't manage to escape in time.</p>
                <button  className={`${Style.restartButton} ${Style.button}`} onClick={startGame}>Try Again</button>
            </div>
        );
    }

    return (
        <div className={Style.card}>
            <h2>Escape Room Challenge</h2>
            <div>
                <h3>Time Remaining: {formatTime(timeLeft)}</h3>
                <h3>Puzzles Solved: {keys.length} / 4</h3>
                <button  className={`${Style.restartButton} ${Style.button}`} onClick={startGame}>Regenerate</button>
            </div>
            <hr />

            {currentView === 'room' && (
                <div className={Style.gameView}>
                    <Image
                        src="/Escape/Background.png" 
                        alt="An escape room with various objects to inspect."
                        layout="fill"
                        objectFit='contain'
                        className={Style.roomBackground}
                    />
                    <Image
                        src="/Escape/Chest.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={160}
                        height={151}
                        className={`${Style.Chest} ${gameTasks[1]?.solved ? Style.solvedItem : ''}`}
                        onClick={handleChestClick}
                    />
                    <Image
                        src="/Escape/book.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={90}
                        height={49}
                        className={`${Style.book} ${gameTasks[3]?.solved ? Style.solvedItem : ''}`}
                        onClick={() => !gameTasks[3]?.solved && handleSelectTask(3)}
                    />
                    <Image
                        src="/Escape/Clock.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={138}
                        height={162}
                        className={`${Style.Clock} ${gameTasks[2]?.solved ? Style.solvedItem : ''}`}
                        onClick={() => !gameTasks[2]?.solved && handleSelectTask(2)}
                    />
                    <Image
                        src="/Escape/Computer.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={230}
                        height={215}
                        className={`${Style.Computer} ${gameTasks[0]?.solved ? Style.solvedItem : ''}`}
                        onClick={handleComputerClick}
                    />
                    <Image
                        src="/Escape/Cube.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={172}
                        height={140}
                        className={`${Style.Cube}`}
                        onClick={handleCubeClick}
                    />
                    <Image
                        src="/Escape/drawer.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={113}
                        height={84}
                        className={Style.drawer} 
                        onClick={()=> alert('You find Nothing')}
                    />
                    <Image
                        src="/Escape/drawer2.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={131}
                        height={108}
                        className={Style.drawer2}
                        onClick={handleDrawerClick} 
                    />
                    <Image
                        src="/Escape/drawer3.PNG" 
                        alt="An escape room with various objects to inspect."
                        width={95}
                        height={51}
                        className={Style.drawer3}
                        onClick={()=> alert('You find Nothing')} 
                    />
                </div>
            )}

            {currentView === 'task' && currentTask && (
                <div>
                    <h3>Task {currentTaskIndex + 1}: {currentTask.title}</h3>
                    <p>{currentTask.description}</p>
                    <CodeEditor  value={userCode}
                        onChange={(value) => setUserCode(value || '')}
                     />
                    <button className={`${Style.submitButton} ${Style.button}`} onClick={handleCodeSubmit}>Submit Solution</button>
                    <button className={`${Style.replayButton} ${Style.button}`} onClick={() => setCurrentView('room')}>Back to Room</button>
                    {feedback && <p>{feedback}</p>}
                </div>
            )}
        </div>
    );
}

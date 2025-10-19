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

            const newKeys = [...keys, `key-color-${keys.length}`]; // e.g., key-color-0, key-color-1
            setKeys(newKeys);
            setFeedback('Correct! You received a key.');

            if (updatedTasks.every(task => task.solved)) {
                setGameState('won');
                setIsActive(false);
            } else {
                // Go back to the room view after solving a task
                setCurrentView('room');
                // Find the next unsolved task to pre-select for the user
                const nextUnsolvedIndex = updatedTasks.findIndex(t => !t.solved);
                if (nextUnsolvedIndex !== -1) {
                    setCurrentTaskIndex(nextUnsolvedIndex);
                }
            }
        } else {
            setFeedback('Incorrect solution. Try again!');
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
                <p className={Style.description}>You have 45 minutes to solve 4 coding challenges to escape.</p>
                <button className={`${Style.playButton} ${Style.button}`} onClick={startGame}>Start Game</button>
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
                <h2>Time's Up!</h2>
                <p>You didn't manage to escape in time.</p>
                <button  className={`${Style.restartButton} ${Style.button}`} onClick={startGame}>Try Again</button>
            </div>
        );
    }

    // Hotspot positions (top, left in %)
    const hotspotPositions = [
        { top: '30%', left: '15%' },
        { top: '65%', left: '30%' },
        { top: '40%', left: '70%' },
        { top: '75%', left: '85%' },
    ];

    return (
        <div className={Style.card}>
            <h2>Escape Room Challenge</h2>
            <div>
                <h3>Time Remaining: {formatTime(timeLeft)}</h3>
                <h3>Puzzles Solved: {keys.length} / 4</h3>
            </div>
            <hr />

            {currentView === 'room' && (
                <div className={Style.roomContainer}>
                <div className={Style.gameView}>
                    <Image
                        src="/Escape/Background.png" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        layout="fill"
                        objectFit='contain'
                        className={Style.roomBackground}
                    />
                    <Image
                        src="/Escape/Chest.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={160}
                        height={151}
                        className={Style.Chest}
                    />
                    <Image
                        src="/Escape/book.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={90}
                        height={49}
                        className={Style.book}
                    />
                    <Image
                        src="/Escape/Clock.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={138}
                        height={162}
                        className={Style.Clock}
                    />
                    <Image
                        src="/Escape/Computer.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={230}
                        height={215}
                        className={Style.Computer}
                    />
                    <Image
                        src="/Escape/Cube.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={172}
                        height={140}
                        className={Style.Cube}
                    />
                    <Image
                        src="/Escape/drawer.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={113}
                        height={84}
                        className={Style.drawer}
                    />
                    <Image
                        src="/Escape/drawer2.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={131}
                        height={108}
                        className={Style.drawer2}
                    />
                    <Image
                        src="/Escape/drawer3.PNG" // Assumes image is in /public/Background.png
                        alt="An escape room with various objects to inspect."
                        width={95}
                        height={51}
                        className={Style.drawer3}
                    />
                    {gameTasks.map((task, index) => (
                        <div
                            key={task.id}
                            className={`${Style.hotspot} ${task.solved ? Style.solved : ''}`}
                            style={hotspotPositions[index]}
                            onClick={() => !task.solved && handleSelectTask(index)}
                            title={task.solved ? 'Solved' : `Inspect item ${index + 1}`}
                        />
                    ))}
                </div>
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
                    {feedback && <p>{feedback}</p>}
                </div>
            )}
        </div>
    );
}

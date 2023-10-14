import React, { createContext, useState, ReactNode } from 'react';

interface ContextType {
    status: number;
    setStatus: React.Dispatch<React.SetStateAction<number>>;
    word: string;
    setWord: React.Dispatch<React.SetStateAction<string>>;
    wonGames: number;
    setWonGames: React.Dispatch<React.SetStateAction<number>>;
    playedGames: number;
    setPlayedGames: React.Dispatch<React.SetStateAction<number>>;
    showRecordModal: string;
    setShowRecordModal: React.Dispatch<React.SetStateAction<string>>;
    timeRest: number;
    setTimeRest: React.Dispatch<React.SetStateAction<number>>;
    globalKey: string;
    setGlobalKey: React.Dispatch<React.SetStateAction<string>>;
}

const GameContex = createContext<ContextType | undefined>(undefined);

function GameContexProvider({ children }: { children: ReactNode }) {

    const storageGameWon = localStorage.getItem("kalpoli-game-won");

    const storageGamePlayed = localStorage.getItem("kalpoli-game-played");

    const [status, setStatus] = useState<number>(0);

    const [word, setWord] = useState<string>("");

    const played = storageGamePlayed ? parseInt(storageGamePlayed) : 0

    const won = storageGameWon ? parseInt(storageGameWon) : 0

    const [wonGames, setWonGames] = useState<number>(won)

    const [playedGames, setPlayedGames] = useState<number>(played)

    const [showRecordModal, setShowRecordModal] = useState<string>('hidden')

    const [timeRest, setTimeRest] = useState<number>(5 * 60);

    const [globalKey, setGlobalKey] = useState<string>("");


    const contextProperties = {
        word,
        setWord,
        wonGames,
        setWonGames,
        playedGames,
        setPlayedGames,
        showRecordModal,
        setShowRecordModal,
        timeRest,
        setTimeRest,
        globalKey,
        setGlobalKey,
        status,
        setStatus
    }

    return (
        <GameContex.Provider value={contextProperties}>
            {children}
        </GameContex.Provider>
    );
}

export { GameContex, GameContexProvider };

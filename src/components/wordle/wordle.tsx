import { useCallback, useEffect, useState, useContext } from 'react';
import { GameContex } from '../../context';
import dictionary from "../../dictionary"
import { regexOnlyLetters, sanitizeWord } from '../../utils';
import { useWordle } from './hordleHooks';

export interface ITablePosition {
    row: number,
    position: number,
    status: number
    letter: string
}

const PLAYED = 1
const EMPTY_LETTER = ''
const SHOW_MODAL = ''
const INITIAL = 0
const INITIAL_TIME = 0
const POSITION_MAX = 4;
const ROWS_MAX = 4;
const LETTER_IN_POSITION = 1
const LETTER_NOT_IN_POSITION = 2
const LETTER_NOT_FOUND = 3

const Wordle = () => {

    const context = useContext(GameContex);

    const { backgrounds, initializeTable } = useWordle()

    if (!context) {
        throw new Error('useContext must be used within a GameContex provider');
    }

    const {
        wonGames,
        setWonGames,
        playedGames,
        setPlayedGames,
        setShowRecordModal,
        globalKey,
        setGlobalKey,
        word,
        setWord,
        setStatus,
        timeRest
    } = context;

    const [position, setPosition] = useState<number>(INITIAL);

    const [row, setRow] = useState<number>(INITIAL);

    const [table, setTable] = useState<ITablePosition[][]>(initializeTable())

    const resetGame = useCallback(() => {
        setTable(initializeTable())
        setWord(getRandonWord())
        setStatus(INITIAL)
        setPosition(INITIAL)
        setRow(INITIAL)
    }, [setWord, setStatus])

    const updateCellValue = useCallback((props: ITablePosition) => {
        const updatedTable = [...table];
        updatedTable[props.row][props.position] = props;
        setTable(updatedTable);
    }, [table])

    const iaWord = useCallback((currentWord: string, row: number) => {
        for (let i = 0; i < ROWS_MAX + 1; i++) {
            const letter = currentWord[i]
            const letterReal = word[i]
            let status = LETTER_NOT_FOUND

            if (letter === letterReal) {
                status = LETTER_IN_POSITION
            } else if (word.includes(letter)) {
                status = LETTER_NOT_IN_POSITION
            }
            updateCellValue({
                row,
                position: i,
                status,
                letter,
            })
        }
    }, [updateCellValue, word])

    const manipulateKey = useCallback((key: string) => {

        if (key === 'TAB' || key === 'ENTER' || key === 'SHIFT') return

        if (key === 'BACKSPACE' || key === '←') {
            if (position === POSITION_MAX && row === ROWS_MAX && table[POSITION_MAX][ROWS_MAX].letter !== '') return
            const backPosition = position === 0 ? position : position - 1
            const backValue: ITablePosition = {
                row: row,
                position: backPosition,
                status: INITIAL,
                letter: ''
            }
            updateCellValue(backValue)
            setPosition(backPosition)
            return
        }

        const cell: ITablePosition = {
            row,
            position,
            status: INITIAL,
            letter: key
        }

        updateCellValue(cell)

        if (position === POSITION_MAX && row < ROWS_MAX) {
            const currentWord = table[row].map((lett: ITablePosition) => lett.letter).join('')
            iaWord(currentWord, row)
            if (currentWord === word) {
                const won = wonGames + 1
                const played = playedGames + 1
                setWonGames(won)
                setPlayedGames(played)
                resetGame()
                setShowRecordModal(SHOW_MODAL)
                localStorage.setItem("kalpoli-game-won", won.toString());
                localStorage.setItem("kalpoli-game-played", played.toString());
                return
            }
            setRow(row + 1)
            setPosition(INITIAL)
        }

        if (position < POSITION_MAX) {
            setPosition(position + 1)
        }
    }, [
        iaWord,
        word,
        position,
        row,
        table,
        updateCellValue,
        wonGames,
        playedGames,
        setPlayedGames,
        setWonGames,
        setShowRecordModal,
        resetGame,
    ])

    const catchKey = useCallback((event: KeyboardEvent) => {

        const presskey = event.key;

        if (!regexOnlyLetters.test(presskey)) return

        if (presskey === 'Alt') return

        manipulateKey(presskey.toUpperCase())

    }, [manipulateKey])


    useEffect(() => {

        document.addEventListener('keydown', catchKey);

        return () => {
            document.removeEventListener('keydown', catchKey);
        };

    }, [catchKey]);

    const getRandonWord = () => {
        const randonIndex = Math.floor(Math.random() * dictionary.length);
        return sanitizeWord(dictionary[randonIndex]).toUpperCase();
    }


    useEffect(() => {
        resetGame()
    }, [resetGame]);

    useEffect(() => {
        if (timeRest <= INITIAL_TIME) {
            resetGame()
        }
    }, [timeRest, resetGame]);

    useEffect(() => {
        if (position === POSITION_MAX && row === ROWS_MAX && table[POSITION_MAX][ROWS_MAX].letter !== '') {
            const currentWord = table[ROWS_MAX].map((lett: ITablePosition) => lett.letter).join('')
            iaWord(currentWord, row)
            resetGame()
            setStatus(PLAYED)
            if (currentWord === word) {
                const won = wonGames + 1
                setStatus(INITIAL)
                setWonGames(won)
                localStorage.setItem("kalpoli-game-won", won.toString());
            }
            const played = playedGames + 1
            setPlayedGames(played)
            localStorage.setItem("kalpoli-game-played", played.toString());
            setShowRecordModal(SHOW_MODAL)
        }
    }, [position, row, table, setPlayedGames, setShowRecordModal, playedGames, iaWord, setWonGames, wonGames, word, setStatus, resetGame])

    useEffect(() => {
        if (globalKey !== EMPTY_LETTER) {
            manipulateKey(globalKey)
            setGlobalKey(EMPTY_LETTER)
        }
    }, [globalKey, manipulateKey, setGlobalKey]);


    return (
        <>
            <section className='bg-white dark:bg-transparent w-3/12 p-4 mb-4'>
                <div className="grid grid-cols-5 gap-3">
                    {table.map((row, rowIndex) =>
                        row.map((cell, columnIndex) => (
                            <div
                                key={`${rowIndex}-${columnIndex}`}
                                className={backgrounds[cell.status] + " flex justify-center items-center border h-14 rounded-md dark:text-white text-2xl font-bold"}
                            >
                                {cell.letter}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    )
}

export default Wordle
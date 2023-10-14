import { useCallback, useEffect, useState, useContext } from 'react';
import { GameContex } from '../context';
import dictionary from "../dictionary"


interface ITablePosition {
    row: number,
    position: number,
    status: number
    letter: string
}

const initializeTable = () => {
    const rows = 5;
    const cols = 5;
    const matriz = [];

    for (let row = 0; row < rows; row++) {
        const fill: ITablePosition[] = [];
        for (let position = 0; position < cols; position++) {
            fill.push({
                row,
                position,
                status: 0,
                letter: '',
            });
        }
        matriz.push(fill);
    }

    return matriz;
}

const backgrounds = [
    'bg-[#939B9F4D] dark:bg-[#262B3C]',
    'bg-[#66A060]',
    'bg-[#CEB02C]',
    'bg-[#939B9F]'
];

const regexOnlyLetters = /^[a-zA-Z]+$/;

const Wordle = () => {

    const context = useContext(GameContex);

    if (!context) {
        throw new Error('useContext must be used within a GameContex provider');
    }

    const { wonGames, setWonGames, playedGames, setPlayedGames, setShowRecordModal, globalKey, setGlobalKey } = context;

    const [word, setWord] = useState<string>('');

    const [position, setPosition] = useState<number>(0);

    const [row, setRow] = useState<number>(0);

    const [table, setTable] = useState<ITablePosition[][]>(initializeTable())

    const updateCellValue = useCallback((props: ITablePosition) => {
        const updatedTable = [...table];
        updatedTable[props.row][props.position] = props;
        setTable(updatedTable);
    }, [table]);


    const iaWord = useCallback((currentWord: string, row: number) => {
        for (let i = 0; i < 5; i++) {
            const letter = currentWord[i];
            const letterReal = word[i];
            let status = 3

            if (letter === letterReal) {
                status = 1
            } else if (word.includes(letter)) {
                status = 2
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

        if (key === 'ENTER') return

        if (key === 'Backspace' || key === '←') {
            if (position === 4 && row === 4 && table[4][4].letter !== '') return
            const backPosition = position === 0 ? position : position - 1
            const backValue: ITablePosition = {
                row: row,
                position: backPosition,
                status: 0,
                letter: ''
            }
            updateCellValue(backValue)
            setPosition(backPosition)
            return
        }

        const cell: ITablePosition = {
            row,
            position,
            status: 0,
            letter: key
        }

        updateCellValue(cell)

        if (position === 4 && row < 4) {
            const currentWord = table[row].map((lett: ITablePosition) => lett.letter).join('')
            iaWord(currentWord, row)
            if (currentWord === word) {
                setWonGames(wonGames + 1)
                setPlayedGames(playedGames + 1)
                setShowRecordModal('')
            }
            setRow(row + 1)
            setPosition(0)
        }

        if (position < 4) {
            setPosition(position + 1)
        }
    }, [iaWord, word, position, row, table, updateCellValue, wonGames, playedGames, setPlayedGames, setWonGames, setShowRecordModal])

    const catchKey = useCallback((event: KeyboardEvent) => {

        console.log(word)

        const presskey = event.key;

        if (!regexOnlyLetters.test(presskey)) return

        if (presskey === 'Alt') return

        manipulateKey(presskey.toUpperCase())

    }, [word, manipulateKey])

    function sanitizeWord(word: string) {
        return word.replace(/[áéíóúÁÉÍÓÚ]/g, function (match: any) {
            return 'aeiouAEIOU'['áéíóúÁÉÍÓÚ'.indexOf(match)];
        });
    }

    useEffect(() => {

        document.addEventListener('keydown', catchKey);

        return () => {
            document.removeEventListener('keydown', catchKey);
        };

    }, [catchKey]);

    useEffect(() => {

        const getRandonWord = () => {
            const randonIndex = Math.floor(Math.random() * dictionary.length);
            return sanitizeWord(dictionary[randonIndex]).toUpperCase();
        }

        setWord(getRandonWord())

    }, []);


    useEffect(() => {
        if (position === 4 && row === 4 && table[4][4].letter !== '') {

            const currentWord = table[4].map((lett: ITablePosition) => lett.letter).join('')
            iaWord(currentWord, row)
            if (currentWord === word) {
                setWonGames(wonGames + 1)
            }
            setPlayedGames(playedGames + 1)
            setShowRecordModal('')
            setPosition(0)

        }
    }, [position, row, table, setPlayedGames, setShowRecordModal, playedGames, iaWord, setWonGames, wonGames, word])

    useEffect(() => {
        if (globalKey !== '') {
            manipulateKey(globalKey)
            setGlobalKey('')
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
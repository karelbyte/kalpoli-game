import { useState, useContext } from "react";
import { GameContex } from '../context';

const backgrounds = [
    'bg-[#939B9F4D] dark:bg-[#565F7E] ',
    'bg-[#66A060] ',
    'bg-[#CEB02C] ',
    'bg-red-10 '
];

interface IKey {
    status: number,
    style: string,
    letter: string,
}

const initializeKeyboard = () => {
    return [
        [{ status: 0, style: '', letter: 'Q' }, { status: 0, style: '', letter: 'W' }, { status: 0, style: '', letter: 'E' }, { status: 0, style: '', letter: 'R' }, { status: 0, style: '', letter: 'T' },
        { status: 0, style: '', letter: 'Y' }, { status: 0, style: '', letter: 'U' }, { status: 0, style: '', letter: 'I' }, { status: 0, style: '', letter: 'O' }, { status: 0, style: '', letter: 'P' }],
        [{ status: 0, style: '', letter: 'A' }, { status: 0, style: '', letter: 'S' }, { status: 0, style: '', letter: 'D' }, { status: 0, style: '', letter: 'F' }, { status: 0, style: '', letter: 'G' },
        { status: 0, style: '', letter: 'H' }, { status: 0, style: '', letter: 'J' }, { status: 0, style: '', letter: 'K' }, { status: 0, style: '', letter: 'L' }, { status: 0, style: '', letter: 'Ñ' }],
        [{ status: 0, style: ' col-span-2 ', letter: 'ENTER' }, { status: 0, style: '', letter: 'Z' }, { status: 0, style: '', letter: 'X' }, { status: 0, style: '', letter: 'C' }, { status: 0, style: '', letter: 'V' },
        { status: 0, style: '', letter: 'B' }, { status: 0, style: '', letter: 'N' }, { status: 0, style: '', letter: 'M' }, { status: 0, style: '', letter: '←' },]
    ]
}

const Querty = () => {

    const context = useContext(GameContex);

    if (!context) {
        throw new Error('useContext must be used within a GameContex provider');
    }

    const { setGlobalKey } = context;

    const [keyboard, setKeyboard] = useState<IKey[][]>(initializeKeyboard())

    const updateKeyStatus = (key: IKey, rowIndex: number, columnIndex: number) => {
        const updatedTable = [...keyboard];
        key.status = 4
        if (key.letter === '←' || key.letter === 'ENTER')  key.status = 0
        updatedTable[rowIndex][columnIndex] = key;
        setKeyboard(updatedTable);
        setGlobalKey(key.letter)
    };

 
    return (
        <>
            <section className='bg-[#F3F3F3] dark:bg-[#262B3C] dark:text-white w-4/12 p-6 mb-4 rounded-md'>
                <div className="grid grid-cols-10 gap-2">
                    {keyboard.map((row, rowIndex) =>
                        row.map((key, columnIndex) => (
                            <div
                            onClick={() => updateKeyStatus(key, rowIndex, columnIndex)}
                                key={`${rowIndex}-${columnIndex}`}
                                className={backgrounds[key.status] + key.style + " cursor-pointer flex justify-center items-center border" +
                                 " dark:border-gray-700 h-14 rounded-md dark:text-white text-2xl font-bold hover:bg-slate-100 dark:hover:bg-slate-900"}
                            >
                                {key.letter}
                            </div>
                        ))
                    )}
                </div>
            </section>

        </>
    )
}

export default Querty

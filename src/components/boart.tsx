import Switch from './switch'
import Help from './help';
import Records from './records';
import Wordle from './wordle';
import { useContext, useEffect } from 'react';
import { GameContex } from '../context';
import Querty from './querty';

interface IBoardProps {
    toggleModeFn: Function,
    theme: string
}
const Board = (props: IBoardProps) => {
    const { toggleModeFn, theme } = props

    const context = useContext(GameContex);

    if (!context) {
        throw new Error('useContext must be used within a GameContex provider');
    }

    const { timeRest, setTimeRest } = context;

    useEffect(() => {
        let interval: any;
        if (timeRest > 0) {
            interval = setInterval(() => {
                setTimeRest(timeRest - 1);
            }, 1000);
        } else {
            setTimeRest(5 * 60);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timeRest, setTimeRest]);

    return (
        <>
            <section className='flex justify-between items-center bg-[#F3F3F3] dark:bg-[#262B3C] dark:text-white w-4/12 p-4 mb-4 rounded-md'>
                <Help />
                <span className='font-semibold text-3xl'>W O R D L E</span>
                <div className='flex items-center'>
                    <Records />
                    <Switch toggleModeFn={toggleModeFn} theme={theme} />
                </div>
            </section>
            <Wordle />
            <Querty/>
        </>
    )
}

export default Board

import { ITablePosition } from "./wordle";

export const useWordle = () => {

    const backgrounds = [
        'bg-[#939B9F4D] dark:bg-[#262B3C]',
        'bg-[#66A060]',
        'bg-[#CEB02C]',
        'bg-[#939B9F]'
    ];

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
    
    return {
        backgrounds,
        initializeTable,
    }
}
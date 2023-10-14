import { GameContex } from '../context';
import { useContext } from 'react';

const PLAYED = 1
const Records = () => {

    const context = useContext(GameContex);

    if (!context) {
        throw new Error('useContext must be used within a GameContex provider');
    }

    const { wonGames, playedGames, showRecordModal, setShowRecordModal, timeRest, word, status } = context;

    const toggleDisplay = (): void => {
        setShowRecordModal(showRecordModal === 'hidden' ? '' : 'hidden')
    }

    const closeModal = (): void => {
        toggleDisplay()
    }

    const min: number = Math.floor(timeRest / 60);
    const secods: number = timeRest % 60;

    return (
        <>
            <svg width="36" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleDisplay} className="cursor-pointer mr-2 fill-black dark:fill-white">
                <rect x="4.93549" y="6" width="29.6129" height="24" rx="2" fillOpacity="0.49" />
                <path d="M13.1613 15L13.1613 24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.7419 18V24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26.3226 12V24" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className={showRecordModal + ' fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50'}>
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col bg-gray-200 p-8 rounded-lg border border-black w-[500px] dark:border-gray-400 dark:bg-[#262B3C] dark:text-white">
                        <p className="text-[35px] self-center mb-12">Estadisticas</p>
                        <div className="flex justify-between mb-9">
                            <div className="flex flex-col items-center ml-6">
                                <p className="text-[35px]">{playedGames}</p>
                                <p>Jugadas</p>
                            </div>
                            <div className="flex flex-col items-center mr-6">
                                <p className="text-[35px]">{wonGames}</p>
                                <p>Victorias</p>
                            </div>
                        </div>
                        {status === PLAYED && <p className="text-[15px] self-center mb-4">La palabra era: <span className='font-bold'>{word}</span></p>}
                        <p className="text-[15px] self-center mb-2">SIGUIENTE PALABRA</p>
                        <p className="text-[35px] self-center mb-8">{min}:{secods}</p>
                        <button id="cerrarModal" className="self-center mt-4 bg-[#6AAA64] text-white font-bold py-2 px-16 rounded" onClick={closeModal}>
                            !ACEPTAR!
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Records
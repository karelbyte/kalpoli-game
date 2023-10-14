import { useState } from "react"

const Help = () => {

    const storageGameUsed = localStorage.getItem("kalpoli-game-used");

    const [display, setDisplay] = useState(storageGameUsed ? 'hidden' : '')

    const toggleDisplay = () => {
        setDisplay(display === 'hidden' ? '' : 'hidden')
    }

    const closeModal = () => {
        if (!storageGameUsed) {
            localStorage.setItem("kalpoli-game-used", 'true');  
        }
        toggleDisplay()
    }

    return (
        <>
            <svg onClick={toggleDisplay} width="22" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer fill-[#818181] dark:fill-[#e2d7d7]'>
                <g clipPath="url(#clip0_7_1572)">
                    <path d="M27 13.5C27 17.0804 25.5777 20.5142 23.0459 23.0459C20.5142 25.5777 17.0804 27 13.5 27C9.91958 27 6.4858 25.5777 3.95406 23.0459C1.42232 20.5142 0 17.0804 0 13.5C0 9.91958 1.42232 6.4858 3.95406 3.95406C6.4858 1.42232 9.91958 0 13.5 0C17.0804 0 20.5142 1.42232 23.0459 3.95406C25.5777 6.4858 27 9.91958 27 13.5ZM9.2745 10.1807H10.6667C10.8996 10.1807 11.0852 9.99 11.1156 9.75881C11.2674 8.65181 12.0268 7.84519 13.3802 7.84519C14.5378 7.84519 15.5976 8.424 15.5976 9.81619C15.5976 10.8877 14.9664 11.3805 13.9691 12.1298C12.8334 12.9549 11.934 13.9185 11.9981 15.4828L12.0032 15.849C12.005 15.9597 12.0502 16.0653 12.1291 16.143C12.208 16.2206 12.3143 16.2641 12.4251 16.2641H13.7936C13.9055 16.2641 14.0128 16.2197 14.0919 16.1406C14.1711 16.0614 14.2155 15.9541 14.2155 15.8422V15.6651C14.2155 14.4534 14.6762 14.1007 15.9199 13.1574C16.9476 12.3761 18.0191 11.5087 18.0191 9.68794C18.0191 7.13813 15.8659 5.90625 13.5084 5.90625C11.3704 5.90625 9.02812 6.90187 8.86781 9.76388C8.8655 9.81837 8.87436 9.87276 8.89385 9.92371C8.91334 9.97465 8.94305 10.0211 8.98114 10.0601C9.01923 10.0992 9.06491 10.13 9.11536 10.1507C9.1658 10.1715 9.21996 10.1817 9.2745 10.1807ZM13.1979 21.0532C14.2273 21.0532 14.9344 20.3884 14.9344 19.4889C14.9344 18.5574 14.2256 17.9027 13.1979 17.9027C12.2124 17.9027 11.4952 18.5574 11.4952 19.4889C11.4952 20.3884 12.2124 21.0532 13.1996 21.0532H13.1979Z" />
                </g>
                <defs>
                    <clipPath id="clip0_7_1572">
                        <rect width="27" height="27" fill="white" />
                    </clipPath>
                </defs>
            </svg>

            <div className={display + ' fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50'}>
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col bg-gray-200 p-8 rounded-lg border border-black w-[500px] dark:border-gray-400 dark:bg-[#262B3C] dark:text-white">
                        <p className="mb-4 text-2xl self-center font-bold ">Cómo jugar</p>
                        <p className="mb-2">Adivina la palabra oculta en cinco intentos.</p>
                        <p className="mb-2">Cada intento debe ser una palabra válida de 5 letras.</p>
                        <p className="mb-2">Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
                        <p className="mb-4">Ejemplos.</p>
                        <div className="flex mb-4 text-[35px] font-medium justify-between">
                            <span className="px-4 bg-[#6AAA64] rounded-md border border-black">G</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">A</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">T</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">O</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">S</span>
                        </div>
                        <p className="mb-4">La letra G está en la palabra y en la posición correcta.</p>
                        <div className="flex mb-4 text-[35px] font-medium justify-between">
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">V</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">O</span>
                            <span className="px-4 bg-[#CEB02C] rounded-md border border-black">C</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">A</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">L</span>
                        </div>
                        <p className="mb-4"> La letra C está en la palabra pero en la posición incorrecta.</p>
                        <div className="flex mb-4 text-[35px] font-medium justify-between">
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">C</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">A</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">N</span>
                            <span className="px-4 bg-white rounded-md border border-black dark:bg-[#262B3C] dark:border-gray-400">T</span>
                            <span className="px-4 bg-[#939B9F] rounded-md border border-black">O</span>
                        </div>
                        <p className="mb-2">La letra O no está en la palabra.</p>
                        <p className="mb-2">Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
                        <p className="mb-2 self-center">¡Una palabra nueva cada 5 minutos!</p>
                        <button id="cerrarModal" className="self-center mt-4 bg-[#6AAA64] text-white font-bold py-2 px-16 rounded" onClick={closeModal}>
                            !JUGAR!
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Help
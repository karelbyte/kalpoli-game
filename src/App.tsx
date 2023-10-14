import React, { FC, useState } from 'react';
import './App.css';
import Board from './components/boart';
import { GameContexProvider } from './context';
const App: FC = () => {

  const [theme, setTheme] = useState<string>('light')

  const toggleMode = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <GameContexProvider>
      <div className={theme}>
        <div className='bg-white dark:bg-slate-900  flex flex-col justify-start items-center min-h-screen pt-11'>
          <Board toggleModeFn={toggleMode} theme={theme} />
        </div>
      </div>
    </GameContexProvider>
  );
}

export default App;

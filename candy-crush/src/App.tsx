import Board from './components/Board';
import { useGame } from './hooks/useGame';

function App() {
  const { board, score, handleDragStart, handleDrop } = useGame();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-900 p-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
        Candy Crush Clone
      </h1>
      
      <div className="bg-slate-800 px-6 py-3 rounded-xl shadow-lg border border-slate-700">
        <span className="text-slate-400 font-medium">Score: </span>
        <span className="text-2xl font-bold text-white">{score}</span>
      </div>

      <Board
        board={board}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
      />
      
      <p className="text-slate-500 text-sm">
        Drag and drop candies to match 3 or more!
      </p>
    </div>
  );
}

export default App;
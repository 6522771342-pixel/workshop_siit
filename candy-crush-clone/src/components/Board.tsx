import { BOARD_SIZE } from '../utils/constants';
import Candy from './Candy';

interface BoardProps {
  board: string[];
  handleDragStart: (index: number) => void;
  handleDrop: (index: number) => void;
}

const Board = ({ board, handleDragStart, handleDrop }: BoardProps) => {
  return (
    <div
      className="grid gap-1 bg-slate-800 p-2 rounded-lg shadow-2xl"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        width: 'min(90vw, 500px)',
        height: 'min(90vw, 500px)',
      }}
    >
      {board.map((color, index) => (
        <Candy
          key={index}
          index={index}
          color={color}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default Board;

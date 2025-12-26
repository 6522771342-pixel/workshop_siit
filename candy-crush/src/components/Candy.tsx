import { motion } from 'framer-motion';

interface CandyProps {
  color: string;
  index: number;
  handleDragStart: (index: number) => void;
  handleDrop: (index: number) => void;
}

const Candy = ({ color, index, handleDragStart, handleDrop }: CandyProps) => {
  return (
    <div
      className="w-full h-full p-1 cursor-grab active:cursor-grabbing"
      draggable={!!color}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', index.toString());
        handleDragStart(index);
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleDrop(index);
      }}
    >
      {color && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full rounded-full shadow-inner border-2 border-white/30"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
};

export default Candy;

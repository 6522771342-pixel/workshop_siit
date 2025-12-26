import { useEffect, useState } from 'react';
import { BOARD_SIZE, CANDY_COLORS } from '../utils/constants';
import { checkForMatches, createBoard, isValidMove } from '../utils/gameLogic';

export const useGame = () => {
  const [board, setBoard] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize board
  useEffect(() => {
    setBoard(createBoard());
  }, []);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItem === null || isProcessing) return;

    // Validate move
    if (isValidMove(board, draggedItem, targetIndex)) {
      const newBoard = [...board];
      [newBoard[draggedItem], newBoard[targetIndex]] = [
        newBoard[targetIndex],
        newBoard[draggedItem],
      ];
      setBoard(newBoard);
      setDraggedItem(null);
    } else {
      setDraggedItem(null);
    }
  };

  useEffect(() => {
    if (board.length === 0) return;

    const timeout = setTimeout(() => {
      const matches = checkForMatches(board);
      
      if (matches.length > 0) {
        // Clear matches
        const newBoard = [...board];
        matches.forEach(index => newBoard[index] = '');
        setBoard(newBoard);
        setScore(prev => prev + matches.length);
        setIsProcessing(true);
        return;
      }

      // Gravity Check
      const newBoard = [...board];
      let isChanged = false;

      // Move down logic (from bottom to top)
      for (let i = BOARD_SIZE * BOARD_SIZE - 1; i >= 0; i--) {
        // If current cell is empty
        if (newBoard[i] === '') {
          // If we are in the top row, generate new candy
          if (i < BOARD_SIZE) {
            newBoard[i] = CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
            isChanged = true;
          } else {
            // Otherwise, pull from above
            if (newBoard[i - BOARD_SIZE] !== '') {
               newBoard[i] = newBoard[i - BOARD_SIZE];
               newBoard[i - BOARD_SIZE] = '';
               isChanged = true;
            } else {
                // If the one above is also empty, we might need to wait for it to fill
                // But this logic simply shifts one step. The next tick will shift again.
                // However, top row generation handles the source.
            }
          }
        }
      }

      if (isChanged) {
        setBoard(newBoard);
        setIsProcessing(true);
      } else {
        setIsProcessing(false);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [board]);

  return { board, score, handleDragStart, handleDrop, isProcessing };
};
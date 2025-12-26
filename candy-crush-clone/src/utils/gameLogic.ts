import { BOARD_SIZE, CANDY_COLORS } from './constants';

export const createBoard = (): string[] => {
  return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, () =>
    CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)]
  );
};

export const checkForMatches = (board: string[]): number[] => {
  const matchedIndices = new Set<number>();

  // Check rows
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    // Skip if it's one of the last 2 columns (can't make a match of 3)
    if ((i % BOARD_SIZE) > BOARD_SIZE - 3) continue;

    const rowThree = [i, i + 1, i + 2];
    const decidedColor = board[i];
    if (!decidedColor) continue;

    if (rowThree.every((index) => board[index] === decidedColor)) {
      rowThree.forEach((index) => matchedIndices.add(index));
    }
  }

  // Check columns
  for (let i = 0; i < BOARD_SIZE * (BOARD_SIZE - 2); i++) {
    const columnThree = [i, i + BOARD_SIZE, i + BOARD_SIZE * 2];
    const decidedColor = board[i];
    if (!decidedColor) continue;

    if (columnThree.every((index) => board[index] === decidedColor)) {
      columnThree.forEach((index) => matchedIndices.add(index));
    }
  }

  return Array.from(matchedIndices);
};

export const isValidMove = (
  board: string[],
  pos1: number,
  pos2: number
): boolean => {
  // Simple check: are they adjacent?
  const diff = Math.abs(pos1 - pos2);
  const isAdjacent = diff === 1 || diff === BOARD_SIZE;
  
  // Prevent wrapping around rows
  if (diff === 1) {
    const row1 = Math.floor(pos1 / BOARD_SIZE);
    const row2 = Math.floor(pos2 / BOARD_SIZE);
    if (row1 !== row2) return false;
  }

  if (!isAdjacent) return false;

  // Clone and swap
  const tempBoard = [...board];
  [tempBoard[pos1], tempBoard[pos2]] = [tempBoard[pos2], tempBoard[pos1]];

  // Check if this results in a match
  const matches = checkForMatches(tempBoard);
  return matches.length > 0;
};

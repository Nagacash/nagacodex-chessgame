import React from 'react';
import { BoardState as FullBoardState, SquareId } from '@/types';
import Square from './Square';

interface BoardProps {
  boardState: FullBoardState;
  onSquareClick: (squareId: SquareId) => void;
  playerColor: 'white' | 'black'; // To orient the board
}

const Board: React.FC<BoardProps> = ({ boardState, onSquareClick, playerColor }) => {
  const displayBoard = playerColor === 'white' ? boardState : [...boardState].reverse().map(row => [...row].reverse());

  return (
    <div className="inline-grid grid-cols-8 border-2 sm:border-4 border-slate-600">
      {displayBoard.map((row, rowIndex) =>
        row.map((squareData, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 !== 0;
          return (
            <Square
              key={squareData.id}
              squareData={squareData}
              onSquareClick={onSquareClick}
              isDark={isDark}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;

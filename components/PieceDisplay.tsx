import React from 'react';
import { Piece } from '@/types'; 
import { PIECE_UNICODE } from '@/constants';

interface PieceDisplayProps {
  piece: Piece;
  sizeClass?: string; 
}

const PieceDisplay: React.FC<PieceDisplayProps> = ({ piece, sizeClass = 'text-4xl' }) => {
  const unicodeChar = PIECE_UNICODE[piece.color][piece.type];
  const colorClass = piece.color === 'white' ? 'text-white' : 'text-neutral-800';
  const shadowAndFilterClass = piece.color === 'white' ? 'filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]' : '';

  return (
    <span 
      className={`${sizeClass} ${colorClass} ${shadowAndFilterClass} select-none`}
      style={{ textRendering: 'optimizeLegibility' }}
    >
      {unicodeChar}
    </span>
  );
};

export default PieceDisplay;

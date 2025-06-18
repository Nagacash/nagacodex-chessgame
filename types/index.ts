export enum PieceType {
  PAWN = 'PAWN',
  ROOK = 'ROOK',
  KNIGHT = 'KNIGHT',
  BISHOP = 'BISHOP',
  QUEEN = 'QUEEN',
  KING = 'KING',
}

export enum PieceColor {
  WHITE = 'white',
  BLACK = 'black',
}

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean; 
}

export type SquareId = string; 

export interface SquareState {
  id: SquareId;
  piece: Piece | null;
  isHighlighted?: boolean;
  isValidMove?: boolean;
  isCheck?: boolean;
  isSelected?: boolean;
}

export type BoardState = SquareState[][]; 

export interface Move {
  from: SquareId;
  to: SquareId;
  promotion?: PieceType; 
}

export interface CastlingAvailability {
  whiteKingSide: boolean;
  whiteQueenSide: boolean;
  blackKingSide: boolean;
  blackQueenSide: boolean;
}

export interface GameState {
  boardState: BoardState;
  currentPlayer: PieceColor;
  castlingAvailability: CastlingAvailability;
  enPassantTarget: SquareId | null;
  halfMoveClock: number; 
  fullMoveNumber: number;
  selectedSquare: SquareId | null;
  validMoves: SquareId[];
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean; 
  winner: PieceColor | null;
  promotingPawn: { from: SquareId, to: SquareId } | null;
  gameStatusMessage: string;
  moveHistory: Move[]; 
}

export type Difficulty = 1 | 2 | 3 | 4;

import { GoogleGenerativeAI, GenerateContentResponse } from "@google/generative-ai";
import { PieceColor, Difficulty } from '@/types';
import { ChessLogic } from './chessLogic';

// For Next.js, environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
// Ensure your .env.local or environment settings define NEXT_PUBLIC_API_KEY
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

let ai: GoogleGenerativeAI | null = null;
if (API_KEY) {
  ai = new GoogleGenerativeAI(API_KEY);
} else {
  console.warn("NEXT_PUBLIC_API_KEY environment variable not set. Gemini API calls will be disabled. AI will use random moves.");
}

/**
 * Generates a system prompt for the Gemini AI based on the selected difficulty.
 * This guides the AI's chess-playing style.
 * @param difficulty The chosen difficulty level.
 * @returns A string containing the system instruction for the AI.
 */
const getSystemPrompt = (difficulty: Difficulty): string => {
  let systemMessageBase = `You are a chess AI. You will be given the current board state in FEN (Forsyth-Edwards Notation) and whose turn it is. 
Your goal is to choose a valid chess move for the specified player. 
Output ONLY the move in UCI format (e.g., e2e4, e7e8q for promotion to Queen). Do not include any other text, reasoning, or apologies.
The current player is indicated in the FEN string. If it's 'w', it's White's turn. If it's 'b', it's Black's turn.`;

  switch (difficulty) {
    case 1:
      systemMessageBase += "\nPlay as a beginner. Prefer simple pawn moves or developing knights and bishops. Try to capture opponent pieces if a safe capture is available. Avoid leaving your pieces where they can be captured for free (hanging pieces).";
      break;
    case 2:
      systemMessageBase += "\nPlay as an improving beginner. Focus on developing your pieces towards the center, ensuring your king is safe (consider castling), and capturing opponent's pieces. Look for simple one-move attacks or captures. Avoid obvious blunders and hanging your pieces.";
      break;
    case 3:
      systemMessageBase += "\nPlay as an intermediate club player. Aim for material advantage, control of central squares, and good piece coordination. Look for basic tactical opportunities like forks, pins, and skewers (1-2 moves ahead). Defend against your opponent's immediate threats. Consider pawn structure and open files.";
      break;
    case 4:
      systemMessageBase += "\nPlay as a strong, advanced chess player. Analyze the position for tactical combinations (forks, pins, skewers, discovered attacks) and strategic advantages (outposts, pawn weaknesses, space). Calculate variations carefully (2-3 moves ahead or more). Your goal is to play precise, strong chess, build up pressure, and convert advantages into a win. Be very mindful of king safety for both sides.";
      break;
  }
  return systemMessageBase;
};

/**
 * Determines the AI's temperature (creativity/randomness) based on difficulty.
 * Lower temperature means more deterministic/conservative moves.
 * @param difficulty The chosen difficulty level.
 * @returns A number representing the temperature (0.0 to 1.0).
 */
const getTemperatureForDifficulty = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 1: return 0.7; // More random
    case 2: return 0.5;
    case 3: return 0.3;
    case 4: return 0.1; // Less random, more focused
    default: return 0.5;
  }
}

/**
 * Fetches an AI move from the Gemini API or falls back to a random move if API is not available or fails.
 * @param chessLogic The current ChessLogic instance to get FEN and player info.
 * @param difficulty The difficulty level for the AI.
 * @param validMovesForAI A list of valid UCI moves for the AI to choose from.
 * @returns A promise that resolves to the chosen AI move in UCI format, or null if no valid move can be made.
 */
export const getAIMove = async (
  chessLogic: ChessLogic, 
  difficulty: Difficulty,
  validMovesForAI: string[] 
): Promise<string | null> => {
  if (!ai) {
    console.warn("Gemini AI not initialized. Falling back to random move.");
    if (validMovesForAI.length > 0) {
      return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
    }
    return null;
  }

  const fen = chessLogic.boardToFEN();
  const currentPlayer = chessLogic.getCurrentPlayer();
  const systemPrompt = getSystemPrompt(difficulty);
  const temperature = getTemperatureForDifficulty(difficulty);
  const userPrompt = `Current board (FEN): ${fen}\nIt is ${currentPlayer === PieceColor.WHITE ? 'White (w)' : 'Black (b)'}'s turn. Choose your move in UCI format. Valid moves include: ${validMovesForAI.join(', ')}.`;
  
  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash-preview-04-17' }); 
    const result = await model.generateContent({ 
      systemInstruction: systemPrompt, 
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }], 
      generationConfig: {
        temperature: temperature, 
        topP: 0.95, 
      }
    });

    // CORRECTED: Access the text content from the response.
    // The 'GenerateContentResponse' itself does not have a 'text' property.
    // The actual text is found within candidates[0].content.parts[0].text
    const aiMoveUci = result.response.candidates?.[0]?.content?.parts?.[0]?.text; 

    // Ensure aiMoveUci is not null or undefined before proceeding
    if (!aiMoveUci) {
      console.warn("Gemini API did not return text content or content was empty. Falling back to random move.");
      if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
      return null;
    }

    const trimmedAiMoveUci = aiMoveUci.trim().toLowerCase(); 
    const uciRegex = /^[a-h][1-8][a-h][1-8][qrnb]?$/; 
    
    // Validate AI's proposed move format
    if (!uciRegex.test(trimmedAiMoveUci)) {
      console.warn("Gemini proposed an invalidly formatted move:", aiMoveUci, "Falling back to random.");
      if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
      return null;
    }
    
    // Validate if AI's proposed move is actually a legal move from the pre-calculated list
    if (validMovesForAI.includes(trimmedAiMoveUci)) {
      return trimmedAiMoveUci;
    } else {
      console.warn("Gemini proposed a move not in the pre-calculated valid list:", aiMoveUci, "Valid moves:", validMovesForAI, "Falling back to random.");
      if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
      return null;
    }

  } catch (error) {
    console.error("Error fetching AI move from Gemini:", error);
    if (validMovesForAI.length > 0) {
        console.warn("Falling back to random move due to API error.");
        return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
    }
    return null;
  }
};

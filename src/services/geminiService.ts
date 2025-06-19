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
  // Use a template literal for better readability of multi-line strings
  let systemMessageBase = `
You are a powerful chess engine, simulating expert-level thinking without human bias.

# 🎯 Goal:
Given a FEN string, output 3–5 legal candidate moves in **UCI format** (e.g., e2e4, e7e8q), then select the **strongest move** to play based on deep evaluation. Do not explain or comment — only output valid UCI moves, one per line.

# ⚙️ Core Rules:
- All moves must be valid based on the FEN.
- Assume you are playing for the side to move.
- Do NOT return annotations, commentary, or any format except raw UCI.

# 🧠 Thinking Process:
1. **Parse the position** from the FEN and identify the active color.
2. **Generate all legal moves** for the current player.
3. **Evaluate each move** based on:
   - **CRITICAL: Material preservation (DO NOT hang pieces, DO NOT allow free captures).**
   - Material gain/loss (prioritize capturing opponent's hanging pieces).
   - King safety (do not walk into check, castle early if safe).
   - Center control.
   - Development and piece activity.
   - Tactical threats (pins, forks, skewers, discoveries, back rank mates).
   - Strategic plans (pawn structure, open files, weak squares).
   - **CRITICAL: Opponent's threats (identify and nullify immediate threats).**
4. **Simulate 3–5 candidate lines**, calculate 3–4 plies deep.
5. **Select the best move** from the candidate list using a heuristic score.

# 🛡️ Defensive Principles:
- **Prioritize protecting your own pieces.** A move that protects a threatened piece is often better than an aggressive but risky one.
- **Never make a move that allows your piece to be captured for free (a blunder), unless it leads to an immediate, decisive checkmate or significant material gain.**
- Always check if your opponent has a strong response to your move, especially a capture or check.
- Keep your king safe, especially in the opening and middlegame.

# 📝 Output Format:
Respond ONLY with 3–5 candidate moves in UCI format (no comments or explanations), followed by a line with: 
"best: <UCI_MOVE>"

# ❌ Don't:
- Use SAN notation (like Nf3).
- Give explanations or reasoning.
- Include punctuation, lists, or numbering.

# ✅ Example:
e2e4  
d2d4  
g1f3  
best: e2e4
`;

  switch (difficulty) {
    case 1: systemMessageBase += `\n# Difficulty: Beginner. Play simply. Avoid captures unless safe. Focus on developing pieces and castling. **Strongly avoid blunders or hanging pieces.**`; break;
    case 2: systemMessageBase += `\n# Difficulty: Intermediate. Look 1-2 moves ahead. Avoid hanging pieces. Attempt to control the center. **Ensure immediate threats to your pieces are handled.**`; break;
    case 3: systemMessageBase += `\n# Difficulty: Club-level. Calculate 2–3 moves. Create threats and look for basic tactics (forks, pins). Prioritize piece activity. **Actively look for and defend against opponent's threats and avoid material loss.**`; break;
    case 4: systemMessageBase += `\n# Difficulty: Strong. Think 3–5 moves ahead. Prioritize initiative, deep tactical combinations, and long-term strategic advantages. Be ruthless in exploiting opponent errors. **Your top priority is solid defense and material integrity, never sacrificing material without clear compensation or a decisive attack.**`; break;
  }

  // Trim to remove any leading/trailing whitespace from the entire prompt
  return systemMessageBase.trim();
};

/**
 * Determines the AI's temperature (creativity/randomness) based on difficulty.
 * Lower temperature means more deterministic/conservative moves.
 * @param difficulty The chosen difficulty level.
 * @returns A number representing the temperature (0.0 to 1.0).
 */
const getTemperatureForDifficulty = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 1: return 0.7; // More random, beginner-like
    case 2: return 0.4; // Slightly more focused
    case 3: return 0.2; // More deterministic
    case 4: return 0.05; // Very deterministic, aiming for optimal play
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

    const fullAiResponse = result.response.candidates?.[0]?.content?.parts?.[0]?.text; 

    if (!fullAiResponse) {
      console.warn("Gemini API did not return text content or content was empty. Falling back to random move.");
      if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
      return null;
    }

    // Split the response by lines and look for the "best: <UCI_MOVE>" line
    const lines = fullAiResponse.split('\n');
    let aiChosenUci: string | null = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('best:')) {
        aiChosenUci = trimmedLine.replace('best:', '').trim().toLowerCase();
        break; // Found the best move, no need to check further
      }
    }

    // If no "best:" line was found, or the extracted move is empty
    if (!aiChosenUci) {
        console.warn("Gemini response did not contain a 'best:' move. Falling back to random.");
        if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
        return null;
    }

    const uciRegex = /^[a-h][1-8][a-h][1-8][qrnb]?$/; 
    
    // Validate AI's proposed move format
    if (!uciRegex.test(aiChosenUci)) { // Use aiChosenUci here directly
      console.warn("Gemini proposed an invalidly formatted move (from 'best:' line):", aiChosenUci, "Falling back to random.");
      if (validMovesForAI.length > 0) return validMovesForAI[Math.floor(Math.random() * validMovesForAI.length)];
      return null;
    }
    
    // Validate if AI's proposed move is actually a legal move from the pre-calculated list
    if (validMovesForAI.includes(aiChosenUci)) { // Use aiChosenUci here directly
      return aiChosenUci;
    } else {
      console.warn("Gemini proposed a move not in the pre-calculated valid list:", aiChosenUci, "Valid moves:", validMovesForAI, "Falling back to random.");
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

import type { PuzzleState } from './types';

export function generateChildrens(state: PuzzleState): PuzzleState[] {
    const successors: PuzzleState[] = [];
    const [blankRow, blankCol] = getBlankPosition(state);
    const variant = [
        [blankRow - 1, blankCol],
        [blankRow + 1, blankCol],
        [blankRow, blankCol - 1],
        [blankRow, blankCol + 1]
    ];
    for (const [row, col] of variant) {
        if (row >= 0 && row < state.board.length && col >= 0 && col < state.board.length) {
            const newState = moveBlank(state, row, col);
            successors.push(newState);
        }
    }
    return successors;
}

export function getBlankPosition(state: PuzzleState): [number, number] {
    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board.length; j++) {
            if (state.board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    throw new Error('Blank position not found');
}

export function moveBlank(state: PuzzleState, x: number, y: number): PuzzleState {
    const newBoard = state.board.map(row => row.slice());
    const [blankRow, blankCol] = getBlankPosition(state);
    const temp = newBoard[x][y];
    newBoard[x][y] = newBoard[blankRow][blankCol];
    newBoard[blankRow][blankCol] = temp;
    return {
        board: newBoard,
        parent: state,
        cost: state.cost + 1
    };
}

export function isEqual(state1: PuzzleState, state2: PuzzleState): boolean {
    return JSON.stringify(state1.board) === JSON.stringify(state2.board);
}

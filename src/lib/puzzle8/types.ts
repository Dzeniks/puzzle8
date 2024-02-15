export interface PuzzleState {
    board: number[][];
    parent: PuzzleState | null;
    cost: number;
}

export interface SolverResult {
    path: PuzzleState[] | null;
    iteration: number;
    visited: number;
}

import type { PuzzleState, SolverResult } from './types';
import { PriorityQueue } from './PriorityQueue';
import { generateChildrens, isEqual } from './utils';

function manhattanDistance(state: PuzzleState): number {
    let distance = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const value = state.board[i][j];
            if (value !== 0) {
                const targetRow = Math.floor((value - 1) / 3);
                const targetCol = (value - 1) % 3;
                distance += Math.abs(i - targetRow) + Math.abs(j - targetCol);
            }
        }
    }
    return distance;
}

export function aStar(initialState: PuzzleState, goalState: PuzzleState, maxIter:number=1000): SolverResult {
    const visited = new Set<string>();
    const frontier = new PriorityQueue<PuzzleState>();
    frontier.enqueue(manhattanDistance(initialState), initialState);
    let iteration = 0;
    while (!frontier.isEmpty()) {
        iteration++;
        if (iteration > maxIter) {
            return {path: null, iteration: iteration, visited: visited.size};
        }
        const currentState = frontier.dequeue()!;
        if (isEqual(currentState, goalState)) {
            const path: PuzzleState[] = [];
            let current: PuzzleState | null = currentState;
            while (current) {
                path.unshift(current);
                current = current.parent || null;
            }
            return {path, iteration, visited: visited.size};
        }
        visited.add(JSON.stringify(currentState.board));
        const succ = generateChildrens(currentState);
        for (const nextState of succ) {
            if (!visited.has(JSON.stringify(nextState.board))) {
                frontier.enqueue(nextState.cost + manhattanDistance(nextState), nextState);
            }
        }
    }
    return {path: null, iteration, visited: visited.size};
}
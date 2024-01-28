import { State } from './State';

export class Puzzle {
    n: number;
    open: State[];
    closed: State[];

    constructor(size: number) {
        this.n = size;
        this.open = [];
        this.closed = [];
    }

    f(start: State, goal: number[][]): number {
        return this.h(start.data, goal) + start.level;
    }

    h(start: number[][], goal: number[][]): number {
        let temp = 0;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (start[i][j] !== goal[i][j] && start[i][j] !== 0) {
                    temp += 1;
                }
            }
        }
        return temp;
    }

    process(start: State, goal: number[][], max_iter:number): number[][][] {
        start.fval = this.f(start, goal);
        this.open.push(start);
        const steps: number[][][] = [];
        while (max_iter > 0) {
            max_iter--;
            const cur = this.open[0];
            steps.push(cur.data)

            if (this.h(cur.data, goal) === 0) {
                break;
            }

            for (const child of cur.generateChild()) {
                child.fval = this.f(child, goal);
                this.open.push(child);
            }

            this.closed.push(cur);
            this.open.shift();

            this.open.sort((a, b) => a.fval - b.fval);
        }
        if (max_iter === 0) {
            alert('No solution found in the given number of iterations');
        }
        return steps
    }
}

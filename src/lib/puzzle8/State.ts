export class State {
    data: number[][];
    level: number;
    fval: number;

    constructor(data: number[][], level: number, fval: number) {
        this.data = data;
        this.level = level;
        this.fval = fval;
    }

    generateChild(): State[] {
        const [x, y] = this.find(this.data,0);
        const valList: number[][] = [[x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]];
        const children: State[] = [];

        for (const i of valList) {
            const child = this.shuffle(this.data, x, y, i[0], i[1]);
            if (child !== null) {
                const childNode = new State(child, this.level + 1, 0);
                children.push(childNode);
            }
        }

        return children;
    }

    shuffle(puz: number[][], x1: number, y1: number, x2: number, y2: number): number[][] | null {
        if (x2 >= 0 && x2 < puz.length && y2 >= 0 && y2 < puz[0].length) {
            const tempPuz: number[][] = this.copy(puz);
            const temp = tempPuz[x2][y2];
            tempPuz[x2][y2] = tempPuz[x1][y1];
            tempPuz[x1][y1] = temp;
            return tempPuz;
        } else {
            return null;
        }
    }

    copy(root: number[][]): number[][] {
        const temp: number[][] = [];
        for (const i of root) {
            const t: number[] = [...i];
            temp.push(t);
        }
        return temp;
    }

    find(puz: number[][], x: number): [number, number] {
        for (let i = 0; i < puz.length; i++) {
            for (let j = 0; j < puz[0].length; j++) {
                if (puz[i][j] === x) {
                    return [i, j];
                }
            }
        }
        throw new Error(`Value '${x}' not found in the puzzle`);
    }
}
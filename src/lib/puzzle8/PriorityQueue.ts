export class PriorityQueue<T> {
    heap: [number, T][] = [];

    enqueue(priority: number, item: T): void {
        this.heap.push([priority, item]);
        this.heap.sort((a, b) => a[0] - b[0]);
    }

    dequeue(): T | undefined {
        return this.heap.shift()?.[1];
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}
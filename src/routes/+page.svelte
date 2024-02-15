<script lang="ts">
	import { aStar } from '$lib/puzzle8/aStar';
	import type { PuzzleState, SolverResult } from '$lib/puzzle8/types';
	import Grid from '$lib/components/Grid.svelte';
	let puzzle: number[] = [0, 2, 3, 1, 5, 6, 4, 7, 8];
	let goal: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];

	let steps: number[][];
	let size = 3;

	function AStart() {
		let init2d: number[][] = [];
		for (let i = 0; i < 3; i++) {
			init2d.push(puzzle.slice(i * 3, i * 3 + 3));
		}

		let goal2d: number[][] = [];
		for (let i = 0; i < 3; i++) {
			goal2d.push(goal.slice(i * 3, i * 3 + 3));
		}

		const initialState: PuzzleState = {
			board: init2d, cost: 0,
			parent: null
		};

		const goalState: PuzzleState = {
			board: goal2d, cost: 0,
			parent: null
		};

		const solution : SolverResult  = aStar(initialState, goalState, max_iter);
		if (!solution.path) {
			alert("No solution found in range of maximum of itereration. Try increasing maximum of itereration");
		}

		steps = solution.path ? solution.path.map((x) => {
			let arr: number[] = [];
			for (let i = 0; i < 3; i++) {
				arr = arr.concat(x.board[i]);
			}
			return arr;
		}) : [];
	}

	function insertPuzzleByString() {
		let puzzle_string: string | null = prompt("Enter the puzzle string");
		console.log(puzzle_string);
		if (!puzzle_string) return;
		puzzle = puzzle_string.split("").map((x) => parseInt(x));
		
	}

	function insertGoalByString() {
		let goal_string: string | null = prompt("Enter the goal string");
		console.log(goal_string);
		if (!goal_string) return;
		goal = goal_string.split("").map((x) => parseInt(x));
	}


	function countNumbersInPlace() {
		let count = 0;
		for (let i = 0; i < puzzle.length; i++) {
			if (puzzle[i] === goal[i]) {
				count++;
			}
		}
		return count;
	}

	let algorithms = [
		{
			text: `A star`,
			func: () => {
				AStart();
			}
		},
	];
	let selected = algorithms[0];
	let max_iter = 1000;
</script>

<section class="flex flex-col md:flex-row md:pl-16">
	<div class="h-screen flex flex-col items-center justify-center space-y-4 md:space-y-8">
		<h1 class="h1">Puzzle8</h1>
		<div>
			<h2>Options</h2>
			<label for="algorithm"
			>Algorithm: <select
				bind:value={selected}
				class="rounded bg-transparent text-center"
			>
				{#each algorithms as question}
					<option value={question} style="background-color: cornflowerblue;">
						{question.text}
					</option>
				{/each}
			</select>
			</label>
			<label for="max_iter"
				>Maximum of iterations: <input
					type="number"
					bind:value={max_iter}
					class="border border-gray-300 rounded bg-transparent text-center w-24"
				/></label
			>
		</div>
		
		<h2>Initial state</h2>
		<Grid bind:gridData={puzzle} {size} disableItem={false}></Grid>
		<button on:click={insertPuzzleByString}>Insert initial state by string</button>

		<h2>Goal</h2>
		<Grid bind:gridData={goal} {size} disableItem={false}></Grid>
		<button on:click={insertGoalByString}>Insert goal by string</button>
		<button on:click={selected["func"]}>Solve Puzzle</button>

		<p>Numbers in place: {countNumbersInPlace()}</p>
	</div>
	{#if steps && steps.length > 0}
		<div
			class="flex flex-col items-center justify-center space-y-8 p-4"
			style="overflow-y: auto; flex: 1;"
		>
			<h1 class="h1">Steps</h1>
			<div class=" items-center justify-center space-y-8 p-4">
			{#each steps as step, index}
				<h3>{index + 1}</h3>
				<Grid gridData={step} {size} disableItem={true}></Grid>
				<div style="height: 1px;width:100% ; border: 1px solid red"></div>
			{/each}
			</div>
		</div>
	{/if}
</section>

<style>

	button:hover {
		background-color: cornflowerblue;
		
	}
</style>


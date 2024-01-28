<script lang="ts">
	import { State } from '$lib/puzzle8/State';
	import { Puzzle } from '$lib/puzzle8/NPuzzle';
	import Grid from '$lib/components/Grid.svelte';
	let puzzle: number[] = [0, 2, 3, 1, 5, 6, 4, 7, 8];
	let end: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 0];

	let steps: number[][];
	let size = 3;

	function AStart() {
		let puzzle2d: number[][] = [];
		for (let i = 0; i < 3; i++) {
			puzzle2d.push(puzzle.slice(i * 3, i * 3 + 3));
		}

		let end2d: number[][] = [];
		for (let i = 0; i < 3; i++) {
			end2d.push(end.slice(i * 3, i * 3 + 3));
		}

		const start = new State(puzzle2d, 0, 0);
		const puz = new Puzzle(3);
		const steps2d = puz.process(start, end2d, max_iter);

		steps = steps2d.map((step) => {
			return step.flat();
		});
	}


	function countNumbersInPlace() {
		let count = 0;
		for (let i = 0; i < puzzle.length; i++) {
			if (puzzle[i] === end[i]) {
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
	<div class="h-screen flex flex-col items-center justify-center space-y-8 p-4">
		<h1 class="h1">Puzzle8</h1>
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
			>Max Iteration: <input
				type="number"
				bind:value={max_iter}
				class="border border-gray-300 rounded bg-transparent text-center w-24"
			/></label
		>
		<h2>Start</h2>
		<Grid bind:gridData={puzzle} {size} disableItem={false}></Grid>
		<h2>Goal</h2>
		<Grid bind:gridData={end} {size} disableItem={true}></Grid>
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

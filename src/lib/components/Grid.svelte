<script>
    export let size = 3;
    let gap = size + 1;
    export let gridData = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    export let disableItem = false;
    
</script>

<div class="grid grid-cols-3 gap-4">
    {#each gridData as row, index}
        <input
            type="number"
            class="p-2 border border-gray-300 rounded bg-transparent text-center w-16"
            bind:value={gridData[index]}
            disabled={disableItem}
        />
    {/each}
</div>

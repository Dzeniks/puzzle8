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
            class="p-2 border border-gray-300 rounded-lg bg-transparent text-center w-16 {disableItem ? 'no-arrow' : ''}"
            bind:value={gridData[index]}
            disabled={disableItem}
        />
    {/each}
</div>

<style>
.no-arrow {
  -moz-appearance: textfield;
  appearance: textfield;
}

.no-arrow::-webkit-inner-spin-button,
.no-arrow::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>


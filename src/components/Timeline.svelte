<script>
    import Task from "./Task.svelte";
    let tasks = [];
</script>

<div class="timeline">
    {#each tasks as task, i (task.start)}
        <Task {...tasks[i]}/>
        {#if i < tasks.length - 1}
            {#if task.end < tasks[i + 1].start}
                <div class="flex flex-col justify-center items-center h-fit gap-1">
                    <div class="leading-[14px] text-[14px] h-fit w-full text-gray-600 font-[450]">{tasks[i + 1].start - task.end} free</div>
                    <div class="leading-[14px] text-[14px] h-fit w-full text-teal-400 font-[650]">Add a task</div>
                </div>
            {:else if task.end > tasks[i + 1].start}
                <div class=" rounded-lg bg-teal-800 leading-[14px] text-[14px] h-fit w-full text-teal-400 font-[650] pr-[10px] pl-[10px] pt-[3px] pb-[3px]">Overlapping</div>
            {/if}
        {/if}
    {/each}
</div>
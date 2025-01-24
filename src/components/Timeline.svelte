<script>
    import Task from "./Task.svelte";
    let tasks = $state([]);

    function amountOfTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}mins`
    }
</script>

<ol class="list-none">
    {#each tasks as task, i (task.start)}
        <li><span class="time">{task.start}</span><Task {...task}/></li>
        {#if i < tasks.length - 1}
            {#if task.end < tasks[i + 1].start && (tasks[i + 1].start - task.end) >= 15}
                <li><span class="time">{task.end}</span><div class="leading-[14px] text-[14px] h-fit w-full text-gray-600 font-[450]">{tasks[i + 1].start - task.end} free</div></li>
            {:else if task.end > tasks[i + 1].start}
                <div class=" rounded-lg bg-teal-800 leading-[14px] text-[14px] h-fit w-full text-teal-400 font-[650] pr-[10px] pl-[10px] pt-[3px] pb-[3px]">Overlapping</div>
            {/if}
        {:else if i === tasks.length - 1}
            <li><span class="time">{task.end}</span><div class="leading-[14px] text-[14px] h-fit w-full text-gray-600 font-[450]">{midnight - task.end} free</div></li>
        {/if}
    {/each}
</ol>

<style>
    .time {
        color: rgb(190, 190, 190);
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
    }
</style>
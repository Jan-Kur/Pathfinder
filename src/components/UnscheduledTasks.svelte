<script>
    import UnscheduledTasksSettings from "./UnscheduledTasksSettings.svelte";
    import { selectedDate, unscheduledTasks } from "../stores";
    import UnschedTask from "./UnschedTask.svelte";

    let showSettings = $state(false);

    let unscheduledTasksArray = $state([]);

    function updateShowUnscheduledSettings() {
        showSettings = false;
    }

    $effect(() => {
        unscheduledTasksArray = [...$unscheduledTasks].filter(task => task.date === $selectedDate);
    })

    function addUnscheduledTask() {
        showSettings = !showSettings;
    }

</script>

<div class="tasks-container w-[90%] h-[690px] px-5 py-3 -mt-[54px] relative rounded-3xl bg-slate-700 bg-opacity-50 flex flex-col items-center">
    <div class="text-xl font-semibold text-gray-200 mb-4 py-2 border-b border-slate-600 w-full text-center">Unscheduled Tasks</div>
    <div class="tasks flex flex-col items-center gap-2 w-full overflow-y-auto">
        {#each unscheduledTasksArray as task}
            <UnschedTask name={task.name} color={task.color} emoji={task.emoji} date={task.date}/>
        {/each}
    </div>
    {#if showSettings}
        <div class="settings-container absolute bottom-[15%]">
            <UnscheduledTasksSettings {updateShowUnscheduledSettings}/>
        </div>
    {/if}
    <button aria-label="add" class="add-button text-slate-800 absolute bottom-[5%]" onclick="{addUnscheduledTask}"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
</div>

<style>
    .add-button {
        width: 80px;
        height: 40px;
        min-height: 40px;
        background-color: #10d2dd;
        border: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        cursor: pointer;
        align-self: center;
    }

    .add-button:hover {
        background-color: #0dc0b4;
        transform: translateY(-2px);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    }

    .add-button svg {
        fill: rgb(11, 15, 23);
        transition: transform 0.2s ease;
    }

    .add-button:active {
        transform: translateY(0);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    }
</style>
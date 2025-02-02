<script>
    import Task from "./Task.svelte";
    import { tasks, selectedDate } from "../stores";
    import { browser } from "$app/environment";
    import TaskSettings from "./TaskSettings.svelte";

    let showTaskSettings = $state(false);
    let tasksArray = $state([]);

    function updateShowSettings() {
        showTaskSettings = false;
    }

    function createGradientString(tasks) {
        if (!tasks.length) return 'white';
        const stops = tasks.map((task, index) => {
            const percentage = (index / (tasks.length - 1)) * 100;
            return `${task.color} ${percentage}%`;
        });
        return `linear-gradient(to bottom, ${stops.join(', ')})`;
    }

    let gradientStyle = $derived(
        tasksArray.length > 0 
            ? createGradientString(tasksArray) 
            : 'white'
    );

    function amountOfTime(minutes) {
        let hours = Math.floor(minutes / 60) !== 0 ? Math.floor(minutes / 60): "";
        let mins = minutes % 60 !== 0 ? minutes % 60 : "";
        if (hours === "") {
            return `${mins}min`
        } else {
            if (mins === "") {
                return `${hours}h`
            } else {
                return `${hours}h ${mins}min`
            }
        }
    }

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let stringifiedHours = `${hours}`;
        let stringifiedMins = `${mins}`;
        return `${stringifiedHours.padStart(2, '0')}:${stringifiedMins.padStart(2, '0')}`
    }

    function addTask() {
        showTaskSettings = !showTaskSettings;
    }
</script>


<ol class="timeline-container">
    {#each tasksArray as task, i}
        <li class="timeline-item">
            <span class="time-label">{formatTime(task.start)}</span>
            <Task name={task.name} startTime={task.start} endTime={task.end} date={task.date} color={task.color} emoji={task.emoji} reminder={task.reminder}/>
        </li>
        {#if i < tasksArray.length - 1}
            {#if task.end < tasksArray[i + 1].start && (tasksArray[i + 1].start - task.end) >= 15}
                <li class="free-time-item">
                    <span class="time-label-end">{formatTime(task.end)}</span>
                    <div class="free-time">
                        {amountOfTime(tasksArray[i + 1].start - task.end)} free
                    </div>
                </li>
            {/if}
        {:else if i === tasksArray.length - 1}
            <li class="free-time-item">
                <span class="time-label-end">{formatTime(task.end)}</span>
                <div class="free-time">
                    {amountOfTime(1440 - task.end)} free
                </div>
            </li>
        {/if}
    {/each}
    <div class="timeline-line" style="background: {gradientStyle};"></div>
    <button aria-label="add" class="add-button text-slate-800" onclick="{addTask}"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>  
    {#if showTaskSettings}
        <div class="task-settings flex justify-center">
            <TaskSettings {updateShowSettings} />
        </div>
    {/if}
</ol>

<style>   
    .timeline-container {
        max-width: 800px;
        max-height: 635px;
        overflow-y: auto;
        padding-left: 40px;
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .timeline-container::-webkit-scrollbar {
        width: 8px;
    }

    .timeline-container::-webkit-scrollbar-track {
        background: none;
    }

    .timeline-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    .timeline-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }


    .timeline-line {
        position: absolute;
        top: 0;
        left: 63px;
        width: 2px;
        height: calc(100% - 47px);
        z-index: 3;
    }

    .timeline-item {
        position: relative;
        z-index: 5;
        margin: 2px 0;
    }

    .time-label {
        font-size: 12px;
        font-weight: 500;
        color: rgb(156 163 175 / var(--tw-text-opacity, 1));
        top: -3px;
        left: -32px;
        position: absolute;
    }

        .time-label-end {
        font-size: 12px;
        font-weight: 500;
        color: rgb(156 163 175 / var(--tw-text-opacity, 1));
        position: absolute;
        left: -32px;
        top: -12px;
        transform: translateY(-50%);
        z-index: 3;
    }


    .free-time-item {
        position: relative;
        z-index: 1;
        text-align: center;
        margin: 2px 0;
    }

    .free-time {
        font-size: 0.8rem;
        font-style: italic;
        color: #d0d0d0;
        text-align: center;
        position: relative;
        z-index: 2;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 0.5rem;
        backdrop-filter: blur(5px);
        background-size: cover;
    }

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

    .add-button svg {
        fill: rgb(11, 15, 23);
        transition: transform 0.2s ease;
    }

    .add-button:hover {
        background-color: #0dc0b4;
        transform: translateY(-2px);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    }

    .add-button:active {
        transform: translateY(0);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    }

</style>
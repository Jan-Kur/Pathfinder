<script>
    import Task from "./Task.svelte";
    import { tasks } from "../stores";

    let tasksArray = [];
    tasks.subscribe((value) => {
        tasksArray = [...value].sort((a, b) => a.start - b.start);
    });

    function updateGradientColors() {
        if (tasksArray.length > 1) {
            const root = document.documentElement;
            root.style.setProperty('--start-color', tasksArray[0].color);
            root.style.setProperty('--end-color', tasksArray[tasksArray.length - 1].color);
        }
    }

    $: updateGradientColors();

    function amountOfTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        return `${hours}h ${mins}mins`
    }

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let stringifiedHours = `${hours}`;
        let stringifiedMins = `${mins}`;
        return `${stringifiedHours.padStart(2, '0')}:${stringifiedMins.padStart(2, '0')}`
    }
</script>

<ol class="timeline-container">
    {#each tasksArray as task, i}
        <li class="timeline-item">
            <span class="time-label">{formatTime(task.start)}</span>
            <Task name={task.name} startTime={task.start} endTime={task.end} color={task.color} emoji={task.emoji} reminder={task.reminder}s/>
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
    <div class="timeline-line"></div>
    <button aria-label="add" class="add-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
</ol>

<style>   
    .timeline-container {
        max-width: 500px;
        margin: 2rem auto;
        padding: 0 1rem;
        position: relative;
    }

    .timeline-line {
        position: absolute;
        top: 0;
        left: 40px;
        width: 2px;
        height: 100%;
        z-index: 3;
        background: linear-gradient(to bottom, var(--start-color, #fff), var(--end-color, #fff));
    }

    .timeline-item {
        position: relative;
        z-index: 5;
        margin: 3px 0;
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
        background-image: url("path-to-cursive-lines.png");
        background-size: cover;
    }

    .add-button {
        width: 50px;
        height: fit-content;
        background-color: #1eeba7;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
    }
</style>
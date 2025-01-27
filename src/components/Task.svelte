<script>
    import TaskSettings from "./TaskSettings.svelte"; 
    import {tasks} from "../stores";

    let { name, startTime, endTime, date, color, emoji, reminder} = $props();

    let taskComplete = $state(false);

    let nameElement;
    let timeElement;
    let backgroundElement;
    let buttonElement;

    let showTaskSettings = $state(false);

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let stringifiedHours = `${hours}`;
        let stringifiedMins = `${mins}`;
        return `${stringifiedHours.padStart(2, '0')}:${stringifiedMins.padStart(2, '0')}`
    }

    function taskDone() {
        taskComplete = !taskComplete;
        buttonElement.classList.toggle('checked', taskComplete);

        if (taskComplete) {
            nameElement.style.textDecoration = "line-through";
            timeElement.style.textDecoration = "line-through";
            backgroundElement.style.backgroundColor = "#3e3f42";
            buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
        } else {
            nameElement.style.textDecoration = "none";
            timeElement.style.textDecoration = "none";
            backgroundElement.style.backgroundColor = color;
            buttonElement.innerHTML = "";
        }
    }

    function editTask() {
        showTaskSettings = !showTaskSettings;
    }

    function deleteTask() {
    tasks.update(currentTasks => {
        const filteredTasks = currentTasks.filter(task => 
            !(task.start === startTime && 
              task.end === endTime && 
              task.name === name)
        );
        return filteredTasks;
    });
}

</script>

<div class="task" style="height: { 1.3 * (endTime - startTime)}px; background-color: transparent;">
    <div bind:this={backgroundElement} class="task-background" style="background-color: {color};"></div>
    <div class="emoji-container" style="background-color: {color};">{emoji}</div>
    <div class="text">
        <div bind:this={nameElement} class="name">{name}</div>
        <div bind:this={timeElement} class="time">{formatTime(startTime)} - {formatTime(endTime)} ({endTime - startTime}min)</div>
    </div>
    <div class="button-container">
        <button aria-label="Edit" class="button" style="color: {color};" onclick="{editTask}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
        <button aria-label="Delete" class="button" style="color: {color};" onclick="{deleteTask}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        <button
            bind:this={buttonElement}
            onclick={taskDone}
            aria-label="Checkbox"
            class="button"
            id="checkbox"
            style="border: 3px solid {color}"
        ></button>
    </div>
</div>

{#if showTaskSettings}
    <div class="task-settings">
        <TaskSettings
            editMode={true}
            taskToEdit={{
                name,
                start: formatTime(startTime),
                end: formatTime(endTime),
                date: "placeholder",
                color,
                emoji,
                reminder
            }}
        />
    </div>
{/if}

<style>
    .task {
        display: flex;
        align-items: center;
        margin: 0 auto;
        border-radius: 10px;
        position: relative;
        padding: 0.3rem;
        min-height: 40px;
        gap: 1rem;
    }

    .emoji-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2.5rem;
        height: 100%;
        border-radius: 8px;
        font-size: 1.2rem;
    }

    .text {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 2px;
    }

    .name {
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 12px;
    }

    .time {
        color: rgb(190, 190, 190);
        font-size: 12px;
        font-weight: 400;
        line-height: 12px;
    }

    .button-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-right: 0.4rem;
        flex: 1;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background-color: transparent;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
    }

    .button:hover {
        transform: scale(1.05);
    }

    .button:active {
        transform: scale(0.95);
    }

    .task-background {
        position: absolute;
        inset: 0;
        z-index: -1;
        filter: brightness(0.3);
        border-radius: 10px;
    }
</style>
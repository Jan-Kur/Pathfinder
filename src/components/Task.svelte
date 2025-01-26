<script>
    let { name, startTime, endTime, color, reminder, emoji } = $props();

    let taskComplete = $state(false);

    let nameElement;
    let timeElement;
    let backgroundElement;
    let buttonElement;

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let stringifiedHours = `${hours}`;
        let stringifiedMins = `${mins}`;
        return `${stringifiedHours.padStart(2, '0')}:${stringifiedMins.padStart(2, '0')}`
    }

    function taskDone() {
        taskComplete = !taskComplete;

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
</script>

<div class="task" style="height: {endTime - startTime}px; background-color: transparent;">
    <div bind:this={backgroundElement} class="task-background" style="background-color: {color};"></div>
    <div class="emoji-container" style="background-color: {color};">{emoji}</div>
    <div class="text">
        <div bind:this={nameElement} class="name">{name}</div>
        <div bind:this={timeElement} class="time">{formatTime(startTime)} - {formatTime(endTime)} ({endTime - startTime}min)</div>
    </div>
    <button
        bind:this={buttonElement}
        onclick={taskDone}
        aria-label="Checkbox"
        class="button"
        style="border: 3px solid {color}"
    ></button>
</div>

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

    .button {
        width: fit-content;
        height: fit-content;
        min-height: 22px;
        min-width: 22px;
        border-radius: 7px;
        background-color: transparent;
        z-index: 1;
        transition: background-color 0.2s;
        margin-right: 0.3rem;
    }

    .button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .task-background {
        position: absolute;
        inset: 0;
        z-index: -1;
        filter: brightness(0.3);
        border-radius: 10px;
    }
</style>
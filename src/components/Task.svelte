<script>
    let {name="Prysznic", startTime="20:00", endTime="20:10", duration=10, color="blue", notification, minuteHeight=2, emoji="🚿"} = $props();
    let taskComplete = $state(false);
    function taskDone() {
        if (taskComplete === true) {
            taskComplete = false;
            document.querySelector(".name").style.textDecoration = "none";
            document.querySelector(".time").style.textDecoration = "none";
            document.querySelector(".task-background").style.backgroundColor = color;
            document.querySelector(".button").innerHTML = "";
        } else {
            taskComplete = true;
            document.querySelector(".name").style.textDecoration = "line-through";
            document.querySelector(".time").style.textDecoration = "line-through";
            document.querySelector(".task-background").style.backgroundColor = "#3e3f42";
            document.querySelector(".button").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
        }
        

    }
</script>

<div class="task" style="height: {3 * duration}px; background-color: transparent;">
    <div class="task-background" style="background-color: {color};"></div>
    <div class="emoji-container" style="background-color: {color};">{emoji}</div>
    <div class="text">
        <div class="name">{name}</div>
        <div class="time">{startTime} - {endTime} ({duration} min)</div>
    </div>
    <button onclick={taskDone} aria-label="Checkbox" class="button" style="border: 3px solid {color}"></button>
</div>

<style>
    .task {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        border-radius: 10px;
        position: relative;
        padding: 0.3rem;
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
        min-height: 26px;
        min-width: 26px;
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
        filter: brightness(0.4);
        border-radius: 10px;
    }
</style>
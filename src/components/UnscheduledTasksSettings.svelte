<script>
	import CalendarPopup from "./CalendarPopup.svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import {tasks, selectedDate, unscheduledTasks} from "../stores";
    import { formatToISODate } from "../stores";

    let { editMode = false, taskToEdit = null } = $props();

    let taskName = $state(editMode ? taskToEdit.name : "");
    let taskColor = $state(editMode ? taskToEdit.color : "#4287f5");
    let taskEmoji = $state(editMode ? taskToEdit.emoji : "📝");
    let taskDate = $state(editMode ? formatToISODate(taskToEdit.date) : formatToISODate($selectedDate));

    let errorMessage = $state("");
    let hasError = $state(false);

    function saveTask() {
        if (!taskName) {
            errorMessage = "Please enter a task name";
            hasError = true;
            return;
        }

        const newTask = {
            name: taskName,
            color: taskColor,
            emoji: taskEmoji,
            date: formatToISODate(taskDate)
        };


        unscheduledTasks.update(currentTasks => {
            if (editMode) {
                const updatedTasks = currentTasks.map(task => {
                    if (task.name === taskToEdit.name &&
                        task.date === taskToEdit.date &&
                        task.color === taskToEdit.color &&
                        task.emoji === taskToEdit.emoji) {
                        return newTask;
                    }
                    return task;
                });
                return updatedTasks;
            } else {
                return [...currentTasks, newTask];
            }
        });
        document.querySelector(".task-settings").remove();
    }

</script>

<div class="task-settings bg-gray-900">
    <button class=" absolute top-1 right-1" aria-label="close" onclick="{() => document.querySelector(".task-settings").remove()}"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
    <input class="name-input bg-gray-900" placeholder="Name"  bind:value={taskName}>
    <div class="time-container bg-gray-900">
        <CalendarPopup bind:selectedDate={taskDate}/>   
    </div>
    <div class="customization">
        <div class="color-container">
            <div class="emoji-text">Color</div>
            <input type="color" bind:value={taskColor} class="color">
        </div>
        <div class="emoji-container">
            <div class="emoji-text">Emoji</div>
            <input class="emoji" bind:value={taskEmoji} placeholder="Enter one emoji">
        </div>
    </div>
    {#if hasError}
        <div class="error-message">
            {errorMessage}
        </div>
    {/if}
    <button class= "bg-slate-400 rounded-md w-[150px] h-[30px] hover:bg-slate-500 text-slate-950 font-medium" onclick={saveTask}>{editMode ? "Update" : "Save"}</button>
</div>

<style>

    * {
        box-sizing: border-box;
    }

    .error-message {
        color: #ff4646;
        font-size: 14px;
        text-align: center;
        padding: 4px 8px;
        background-color: rgba(255, 70, 70, 0.1);
        border-radius: 4px;
        width: 100%;
    }


    .task-settings {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        width: fit-content;
        min-width: 300px;
        overflow-y: auto;
        gap: 12px;
        padding: 10px 20px;
        border-radius: 8px;
    }

    .name-input {
        font-size: 16px;
        border: none;
        color: rgb(227, 225, 234);
        outline: none;
        box-sizing: border-box;
        width: 100%;
        line-height: 16px;
        height: fit-content;
        font-weight: 600;
        text-align: center;
    }

    .time-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }

    .color {
        width: 130px;
        outline: none;
        height: 40px;
        padding: 0;
        background: none;
        border-radius: 7px;
    }

    .emoji {
        box-sizing: border-box;
        width: 130px;
        height: 34px;
        border-radius: 4px;
        background-color: rgb(31, 41, 55);
        margin-top: 2px;
        color: rgb(227, 225, 234);
        margin-top: 4px;
        margin-bottom: 4px;
    }

    .customization {
        display: flex;
        align-items: center;
        gap: 20px;
        justify-content: space-between;
    }

    .emoji-container, .color-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>
<script>
	import CalendarPopup from "./CalendarPopup.svelte";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import TimePicker from "./TimePicker.svelte";
    import {tasks} from "../stores";

    let { editMode = false, taskToEdit = null } = $props();

    let taskName = $state(editMode ? taskToEdit.name : "");
    let from = $state(editMode ? taskToEdit.start : "12:30");
    let to = $state(editMode ? taskToEdit.end : "13:00");
    let taskColor = $state(editMode ? taskToEdit.color : "#4287f5");
    let taskEmoji = $state(editMode ? taskToEdit.emoji : "📝");
    let taskReminder = $state(editMode ? taskToEdit.reminder : false);
    let showTimePicker = $state(false);
    let whichTimePicker = $state("");
    let duration = $derived(timeToMinutes(to) - timeToMinutes(from));
    let selectedDate = $state(editMode ? taskToEdit.date : "");

    let errorMessage = $state("");
    let hasError = $state(false);

    function checkValidDuration(start, end) {
        let valid = true;
        if (start >= end) {
            valid = false
        }
        return valid
    }

    function checkOverlap(start, end) {
        let overlap = false;
        if (editMode) {
            return
        }
        let currentTasks;
        tasks.subscribe(value => {
            currentTasks = value;
        });

        const newStart = timeToMinutes(start);
        const newEnd = timeToMinutes(end);
        
        currentTasks.forEach(task => {
            if ((newStart >= task.start && newStart < task.end) || 
                (newEnd > task.start && newEnd <= task.end) ||
                (newStart <= task.start && newEnd >= task.end)) {
                overlap = true;
            }
        });
        
        return overlap;
    }

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

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

    function saveTask() {
        if (!taskName) {
            errorMessage = "Please enter a task name";
            hasError = true;
            return;
        }

        if (checkOverlap(from, to)) {
            errorMessage = "This time slot overlaps with an existing task";
            hasError = true;
            return;
        }

        if (!checkValidDuration(from, to)) {
            errorMessage = "Duration can't be negative";
            hasError = true;
            return
        }

        const newTask = {
            name: taskName,
            start: timeToMinutes(from),
            end: timeToMinutes(to),
            date: selectedDate,
            color: taskColor,
            emoji: taskEmoji,
            reminder: taskReminder
        };

        tasks.update(currentTasks => {
            if (editMode) {

            const editingTaskStart = timeToMinutes(taskToEdit.start);
            const editingTaskEnd = timeToMinutes(taskToEdit.end);
            
            const updatedTasks = currentTasks.map(task => {
                if (task.start === editingTaskStart && 
                    task.end === editingTaskEnd && 
                    task.name === taskToEdit.name) {
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
        <div class="duration">Duration: {amountOfTime(duration)}</div>
        <div class="from-to-container">
            <input class="time-input" type="time" required bind:value={from}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e1ea"><path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z"/></svg>
            <input class="time-input" type="time" required bind:value={to}>
        </div>
        <CalendarPopup bind:selectedDate/>   
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
    <div class="flex items-center justify-between w-[270px]">
        <label for="notification" class=" text-gray-200">Reminder when the task starts</label>
        <Switch id="notification" bind:checked={taskReminder} class="dark"/>
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

    .time-input {
        background-color: rgb(31, 41, 55);
        border: 1px solid rgb(75, 85, 99);
        border-radius: 7px;
        color: rgb(227, 225, 234);
        padding: 8px;
        width: 110px;
        outline: none;
        font-size: 14px;
    }

    .time-input::-webkit-calendar-picker-indicator {
        filter: invert(0.8);
        cursor: pointer;
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

    .duration {
        font-size: 16px;
        font-weight: 500;
        color: rgb(227, 225, 234);
        background-color: rgb(31, 41, 55);
        border-radius: 7px;
        padding: 4px 0;
        min-width: 100px;
        text-align: center;
    }

    .from-to-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
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
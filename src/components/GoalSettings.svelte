<script>
    import CalendarPopup from "./CalendarPopup.svelte";
    import { formatToISODate } from "../stores";

    let {goal, updateEditingGoal} = $props();

    let name = $state("");
    let hours = $state(0);
    let deadline = $state("");
    let emoji = $state("");

    function cancel(event) {
        //event.preventDefault();
        updateEditingGoal(null);
    }

    function save(event) {
        event.preventDefault()
        goal.name = name;
        goal.hours = hours;
        goal.deadline = formatToISODate(deadline);
        goal.emoji = emoji;
        goal.isSet = true;
        updateEditingGoal(null);
    }
</script>

<form 
    class="goal-settings-form"
    on:submit={save}
>
    <div class="settings-content">
        <input 
            type="text"
            id="name-input"
            placeholder="Goal name"
            class="input-field text-lg"
            bind:value={name}
            required
        >

        <div class="input-group">
            <div class="text-slate-300 text-lg">Hours to achieve the goal</div>
            <input 
                type="number"
                class="input-field w-24"
                bind:value={hours}
                min="1"
                required
            >
        </div>

        <div class="input-group">
            <div class="text-slate-300 text-lg">Deadline</div>
            <CalendarPopup bind:selectedDate={deadline}/>
        </div>

        <input 
            type="text"
            placeholder="Goal emoji"
            class="input-field"
            id="emoji-input"
            bind:value={emoji}
            maxlength="2"
            required
        >
    </div>

    <div class="button-group">
        <button 
            type="button"
            class="cancel-button"
            on:click={cancel}
        >
            Cancel
        </button>
        <button 
            type="submit"
            class="save-button"
        >
            Save
        </button>
    </div>
</form>

<style>
    .goal-settings-form {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1.25rem;
    }

    .settings-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        padding-right: 0.5rem;
    }

    .settings-content::-webkit-scrollbar {
        width: 4px;
    }

    .settings-content::-webkit-scrollbar-thumb {
        background-color: rgb(71 85 105 / 0.5);
        border-radius: 4px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.25rem;
    }

    .button-group {
        display: flex;
        gap: 0.75rem;
        padding-top: 0.75rem;
        border-top: 1px solid rgb(71 85 105 / 0.3);
        margin-top: 0.75rem;
    }

    .input-field {
        width: 100%;
        padding: 0.5rem 0.75rem;
        background-color: rgb(15 23 42 / 0.3);
        border: 1px solid rgb(71 85 105 / 0.3);
        border-radius: 0.5rem;
        color: rgb(226 232 240);
    }

    .input-field:focus {
        outline: 2px solid rgb(6 182 212 / 0.5);
        outline-offset: 1px;
    }

    .input-field::placeholder {
        color: rgb(148 163 184);
    }

    .cancel-button,
    .save-button {
        flex: 1;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background-color 0.2s;
    }

    .cancel-button {
        background-color: rgb(71 85 105 / 0.5);
        color: rgb(226 232 240);
    }

    .cancel-button:hover {
        background-color: rgb(71 85 105 / 0.7);
    }

    .save-button {
        background-color: rgb(6 182 212 / 0.8);
        color: white;
    }

    .save-button:hover {
        background-color: rgb(6 182 212);
    }

    #name-input {
        margin-top: 0.25rem;
        margin-left: 0.25rem;
        max-width: 300px;
    }

    #emoji-input {
        margin-bottom: 0.25rem;
        margin-left: 0.25rem;
        max-width: 300px;
    }

</style>
<script>
	import CalendarPopup from "./CalendarPopup.svelte";

    let duration = $state(30);
    let from = $state(`12:30`);
    let to = $state(`13:00`);

    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60) !== 0 ? Math.floor(minutes / 60): "";
        let mins = minutes % 60 !== 0 ? minutes % 60 : "";
        if (hours === "") {
            return `${mins}min`
        } else {
            if (mins === 0) {
                return `${hours}h`
            } else {
                return `${hours}h ${mins}min`
            }
        }  
    }

    

</script>

<div class="task-settings bg-gray-900">
    <input class="name-input bg-gray-900" placeholder="Name">
    <div class="time-container bg-gray-900">
        <div class="duration">Duration: {formatTime(duration)}</div>
        <div class="from-to-container">
            <button class="from">{from} </button>
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e1ea"><path d="m600-200-57-56 184-184H80v-80h647L544-704l56-56 280 280-280 280Z"/></svg>
            <button class="to">{to}</button>
        </div>
        <CalendarPopup/>   
    </div>
    <div class="customization">
        <div class="color-container">
            <div class="emoji-text">Color</div>
            <input type="color" class="color">
        </div>
        <div class="emoji-container">
            <div class="emoji-text">Emoji</div>
            <input class="emoji" placeholder="Enter one emoji">
        </div>
        
    </div>
    
</div>

<style>

    * {
        box-sizing: border-box;
    }

    .task-settings {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 500px;
        width: fit-content;
        min-width: 300px;
        overflow-y: auto;
        gap: 10px;
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

    .duration, .from, .to {
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
        height: 32px;
        border-radius: 4px;
        background-color: rgb(31, 41, 55);
        margin-top: 2px;
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
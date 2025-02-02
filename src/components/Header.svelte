<script>
    import Calendar from "$lib/components/ui/calendar/calendar.svelte";
    import { selectedDate } from "../stores";
    import { parseDate, getLocalTimeZone } from "@internationalized/date";
    import { formatToISODate } from "../stores";
    
    let showCalendar = $state(false);
    let calendarValue = $state(parseDate($selectedDate));

    $effect(() => {
        if (calendarValue) {
            $selectedDate = formatToISODate(calendarValue.toString());
            showCalendar = false;
        }
    })

</script>


<div class=" flex gap-3 p-2">
    <button aria-label="calendar" onclick={() => showCalendar = !showCalendar}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/></svg></button>
</div>

{#if showCalendar}
    <div class="w-fit h-fit absolute top-12 left-0 bg-gray-800 rounded-lg shadow-lg z-50">
        <Calendar bind:value={calendarValue}/>
    </div>
{/if}
<script>
	import { onMount } from "svelte";
    
    let {showTimePicker, whichTimePicker, from, to} = $props();

    let initialHour;
    let initialMinute;

    if (whichTimePicker === "from") {
        [initialHour, initialMinute] = from.split(":");
    } else if (whichTimePicker === "to") {
        [initialHour, initialMinute] = to.split(":");
    }

    let hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    let minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

    let centerHourIndex = parseInt(initialHour);
    let centerMinuteIndex = parseInt(initialMinute);

    function calculateScrollPosition(index) {
        return index * 30;
    }

    function getCenteredItem(containerSelector) {
    const container = document.querySelector(containerSelector);
    const items = container.querySelectorAll('.item');
    const containerHeight = container.offsetHeight;

    const scrollTop = container.scrollTop;
    
    let centeredIndex = Math.round(scrollTop / 30);
    if (centeredIndex < 0) centeredIndex = 0;
    if (centeredIndex >= items.length) centeredIndex = items.length - 1;

    return items[centeredIndex].textContent;
}


    onMount(() => {
        const hourContainer = document.querySelector('.hours');
        const minuteContainer = document.querySelector('.minutes');

        const hourScrollPosition = calculateScrollPosition( 48 + centerHourIndex);
        const minuteScrollPosition = calculateScrollPosition( 120 + centerMinuteIndex);
    
        hourContainer.scrollTop = hourScrollPosition;
        minuteContainer.scrollTop = minuteScrollPosition;
    })


    function choose() {
        const selectedHour = getCenteredItem('.hours');
        const selectedMinute = getCenteredItem('.minutes');

        if (whichTimePicker === "from") {
            from = (`${selectedHour}:${selectedMinute}`)
            console.log(from);
        } else if (whichTimePicker === "to") {
            to = (`${selectedHour}:${selectedMinute}`)
            console.log(to);
        }

        let data = 2
        showTimePicker = false;
    }

</script>

<main class="container bg-slate-950">
    <div class="columns-container">
        <section class="hours">
            {#each [...hours, ...hours, ...hours, ...hours, ...hours] as hour}
                <div class="item">{hour}</div>
            {/each}
        </section>
    
        <section class="minutes">
            {#each [...minutes, ...minutes, ...minutes, ...minutes, ...minutes] as minute}
                <div class="item">{minute}</div>
            {/each}
        </section>
    </div>
    <button onclick="{choose}">Choose</button>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: fit-content;
        width: 200px;
        position: absolute;
        top: 180px;
        left: 60px;
        border-radius: 10px;
        gap: 15px;
        padding-bottom: 10px;
    }

    .columns-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        height: fit-content;
        width: 200px;
    }

    .hours, .minutes {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        height: 200px;
        scroll-snap-type: y mandatory;
        background: rgb(11, 15, 23);
        border-radius: 8px;
        padding: 10px;
        scrollbar-width: none;
        position: relative;
    }

    .item {
        color: white;
        scroll-snap-align: center;
        text-align: center;
        flex: none;
        font-size: 20px;
        margin: 5px 0;
    }

    .hours, .minutes {
        background: linear-gradient(
            rgb(11, 15, 23),
            rgba(255, 255, 255, 0.1) 50%,
            rgb(11, 15, 23)
        );
        mask-image: linear-gradient(to bottom, transparent, black 50%, black 50%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black 50%, black 50%, transparent);
    }

    .hours::-webkit-scrollbar, .minutes::-webkit-scrollbar {
    display: none;
}

    button {
        background-color: aquamarine;
        color: rgb(11, 15, 23);
        font-size: 14px;
        font-weight: 600;
        width: 100%;
        padding: 2px 10px;
        border-radius: 8px;
    }

</style>

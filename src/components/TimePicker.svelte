<script>
	import { onMount } from "svelte";

    let {initialHour = "2", initialMinute = "15"} = $props();
    let hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    let minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

    let centerHourIndex = parseInt(initialHour);
    let centerMinuteIndex = parseInt(initialMinute);

    function calculateScrollPosition(index) {
        return index * 30;
    }

    onMount(() => {
        const hourContainer = document.querySelector('.hours');
        const minuteContainer = document.querySelector('.minutes');

        const hourScrollPosition = calculateScrollPosition(centerHourIndex - 1);
        const minuteScrollPosition = calculateScrollPosition(centerMinuteIndex - 1);
    
        hourContainer.scrollTop = hourScrollPosition;
        minuteContainer.scrollTop = minuteScrollPosition;
    })

</script>

<main class="container">
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
    <button>Choose</button>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 240px;
        width: 200px;
    }

    .columns-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15px;
        background-color: rgb(11, 15, 23);
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
        width: 100%;
        padding: 2px 10px;
        border-radius: 8px;
    }

</style>

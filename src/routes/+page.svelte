<script>
    import Header from "../components/Header.svelte";
    import Task from "../components/Task.svelte";
    import Timeline from "../components/Timeline.svelte";
    import TaskSettings from "../components/TaskSettings.svelte";
	import TimePicker from "../components/TimePicker.svelte";
	import { Time } from "@internationalized/date";
    import { selectedDate } from "../stores";

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

</script>

<Header/>
<h2 class="text-center text-xl font-semibold text-gray-200 mt-4 mb-2">
    {formatDate($selectedDate)}
</h2>
<Timeline/>
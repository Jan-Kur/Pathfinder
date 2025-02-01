<script>
    import Header from "../components/Header.svelte";
    import Task from "../components/Task.svelte";
    import Timeline from "../components/Timeline.svelte";
    import TaskSettings from "../components/TaskSettings.svelte";
    import TimePicker from "../components/TimePicker.svelte";
    import { Time } from "@internationalized/date";
    import { selectedDate } from "../stores";
    import Goals from "../components/Goals.svelte";
    import GoalSettings from "../components/GoalSettings.svelte";
    import Checkpoint from "../components/Checkpoint.svelte";

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

<div class="flex flex-col min-h-screen">
    <Header/>
    <h2 class="text-center text-xl font-semibold text-gray-200 p-4 pb-0">
        {formatDate($selectedDate)}
    </h2>
    <div class="flex-1 flex flex-col lg:flex-row justify-between items-start py-4 px-2 lg:px-6 mb-2 gap-4">
        <div class="w-full lg:w-[30%] xl:w-[25%] min-w-0">
            <Goals/>
        </div>
        
        <div class="flex-1 w-full min-w-0">
            <Timeline/>
        </div>
        
        <div class="">
        </div>
    </div>
</div>

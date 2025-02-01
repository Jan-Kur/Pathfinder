<script>
    import Header from "../components/Header.svelte";
    import Task from "../components/Task.svelte";
    import Timeline from "../components/Timeline.svelte";
    import TaskSettings from "../components/TaskSettings.svelte";
    import { Time } from "@internationalized/date";
    import { selectedDate } from "../stores";
    import Goals from "../components/Goals.svelte";
    import GoalSettings from "../components/GoalSettings.svelte";
    import Checkpoint from "../components/Checkpoint.svelte";
    import UnscheduledTasks from "../components/UnscheduledTasks.svelte";

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
    <main class="flex-1 flex flex-col px-6 lg:px-12">
        <h2 class="text-center text-xl font-semibold text-gray-200 py-4">
            {formatDate($selectedDate)}
        </h2>
        
        <div class="flex-1 flex flex-col lg:flex-row justify-between items-start gap-8">
            <section class="w-full lg:w-1/3 flex justify-center">
                <Goals/>
            </section>
            
            <section class="w-full lg:w-1/3 flex justify-center">
                <Timeline/>
            </section>
            
            <section class="w-full lg:w-1/3 flex justify-center">
                <UnscheduledTasks/>
            </section>
        </div>
    </main>
</div>

<style>
    main {
        max-width: 1920px;
        margin: 0 auto;
        width: 100%;
    }
</style>
<script lang="ts">
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone,
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button";
    import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";

    export let selectedDate: string = "";
    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });
    let value: DateValue | undefined = undefined;

    $: if (value) {
        selectedDate = df.format(value.toDate(getLocalTimeZone()));
    }
</script>

<Popover.Root openFocus>
    <Popover.Trigger asChild let:builder>
        <Button
            variant="outline"
            class={cn(
                "w-[280px] justify-start text-left font-normal",
                !value && "text-gray-400",
                "bg-gray-800 text-gray-200 border-gray-700"
            )}
            builders={[builder]}
        >
            <CalendarIcon class="mr-2 h-4 w-4 text-gray-400" />
            {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
        </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-lg">
        <Calendar
            bind:value
            initialFocus
            class="bg-gray-800 text-gray-200 border-none"
        />
    </Popover.Content>
</Popover.Root>

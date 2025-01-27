import { writable } from "svelte/store";
export const tasks = writable([
    {
    name: "prysznic",
    start: 1200,
    end: 1210,
    date: "",
    color: "#f72daa",
    emoji: "🚿",
    reminder: true
},
{
    name: "bieganie",
    start: 1220,
    end: 1255,
    date: "",
    color: "aquamarine",
    emoji: "🚿",
    reminder: true
},
{
    name: "obiad",
    start: 600,
    end: 650,
    date: "",
    color: "navy",
    emoji: "🚿",
    reminder: true
},
{
    name: "kodowanie",
    start: 700,
    end: 759,
    date: "",
    color: "#fc0356",
    emoji: "🚿",
    reminder: true
}
]);
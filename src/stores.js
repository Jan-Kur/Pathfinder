import { writable } from "svelte/store";
export const tasks = writable([
    {
    name: "prysznic",
    start: 1200,
    end: 1210,
    color: "#f72daa",
    emoji: "🚿",
    reminder: true
},
{
    name: "bieganie",
    start: 1220,
    end: 1250,
    color: "#ed3b00",
    emoji: "🚿",
    reminder: true
},
{
    name: "jedzenie",
    start: 900,
    end: 1050,
    color: "#1eeba7",
    emoji: "🚿",
    reminder: true
},
{
    name: "spanie",
    start: 565,
    end: 570,
    color: "#027bab",
    emoji: "🚿",
    reminder: true
}
]);
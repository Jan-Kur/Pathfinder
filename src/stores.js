import { writable } from "svelte/store";

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

export function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const selectedDate = writable(getTodayDate());
export const goals = writable([
        { id: 1, isSet: false, name: "", emoji: "", hours: 0, deadline: "", checkpoints: []},
        { id: 2, isSet: false, name: "", emoji: "", hours: 0, deadline: "", checkpoints: []},
        { id: 3, isSet: false, name: "", emoji: "", hours: 0, deadline: "", checkpoints: []}
    ])

export function formatToISODate(date) {
    if (typeof date === 'string') {
        if (date.includes(',')) {
            const newDate = new Date(date);
            const userTimeZoneDiff = newDate.getTimezoneOffset() * 60000;
            const adjustedDate = new Date(newDate.getTime() - userTimeZoneDiff);
            return adjustedDate.toISOString().split('T')[0];
        }
        if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return date;
        }
    }
    if (date instanceof Date) {
        const userTimeZoneDiff = date.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() - userTimeZoneDiff);
        return adjustedDate.toISOString().split('T')[0];
    }
    return date;
}

export const tasks = writable([
    {
    name: "prysznic",
    start: 1200,
    end: 1210,
    date: getTodayDate(),
    color: "#f72daa",
    emoji: "🚿",
    reminder: true
},
{
    name: "bieganie",
    start: 1220,
    end: 1255,
    date: getTodayDate(),
    color: "aquamarine",
    emoji: "🏃",
    reminder: true
},
{
    name: "obiad",
    start: 600,
    end: 650,
    date: getTodayDate(),
    color: "navy",
    emoji: "🍽️",
    reminder: true
},
{
    name: "kodowanie",
    start: 700,
    end: 759,
    date: getTodayDate(),
    color: "#fc0356",
    emoji: "💻",
    reminder: true
}
]);
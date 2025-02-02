import { writable, get } from "svelte/store";

function getStorageValue(key, defaultValue) {
    if (typeof window === "undefined") return defaultValue;

    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;

    try {
        return JSON.parse(stored);
    } catch {
        return defaultValue;
    }
}

function createPersistedStore(key, initialValue) {
    const stored = getStorageValue(key, initialValue);

    const store = writable(stored);

    store.subscribe(value => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });
    return store;
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
}

export const checkpointStore = writable({});

export function updateCheckpoint(goalId, checkpointId, updates) {
    goals.update(currentGoals => 
        currentGoals.map(goal => {
            if (goal.id === goalId) {
                const updatedCheckpoint = goal.checkpoints.find(cp => cp.id === checkpointId);
                return {
                    ...goal,
                    checkpoints: goal.checkpoints.map(cp => 
                        cp.id === checkpointId 
                            ? { ...cp, ...updates, timer: { ...cp.timer, ...updates.timer } }
                            : cp
                    )
                };
            }
            return goal;
        })
    );
}


export function updateGoalPoints(goalId, pointsToAdd) {
    goals.update(currentGoals =>
        currentGoals.map(goal =>
            goal.id === goalId
                ? { ...goal, totalPoints: (goal.totalPoints || 0) + pointsToAdd }
                : goal
        )
    );
}


export function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function formatTagTime(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}

export const selectedDate = createPersistedStore("selectedDate", getTodayDate());

export const goals = createPersistedStore("goals", [
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

export const tasks = createPersistedStore("tasks", [
    {
    name: "breakfast",
    start: 495,
    end: 510,
    date: getTodayDate(),
    color: "#f72daa",
    emoji: "🍽️",
    reminder: true
},
{
    name: "running",
    start: 420,
    end: 480,
    date: getTodayDate(),
    color: "aquamarine",
    emoji: "🏃",
    reminder: true
}
]);

export const unscheduledTasks = createPersistedStore("unscheduledTasks", [
    {
    name: "taking out the trash",
    color: "#113b13",
    emoji: "🗑️",
    date: getTodayDate()
},
{
    name: "homework",
    color: "#1b88bf",
    emoji: "📚",
    date: getTodayDate()
}])
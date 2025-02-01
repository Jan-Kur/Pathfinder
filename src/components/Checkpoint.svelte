<script>
    import { formatTime, updateCheckpoint, formatTagTime, updateGoalPoints} from "../stores";
    import { fade, slide } from 'svelte/transition';

    let {checkpoint, goal} = $props();
    let showCheckpoint = $state(false);
    let displayTime = $state(checkpoint.timer.totalTime);
    
    $effect(() => {
        displayTime = checkpoint.timer.totalTime;
    });

    let checkpointIndex = $derived(goal.checkpoints.findIndex(c => c.id === checkpoint.id));
    let totalCheckpoints = $derived(goal.checkpoints.length);
    let verticalPosition = $derived(`${((totalCheckpoints - checkpointIndex) * (100 / (totalCheckpoints + 1)))}%`);
    
    function openCheckpoint() {
        showCheckpoint = !showCheckpoint;
    }

    function playTimer() {
        if (!checkpoint.timer.isRunning) {
            const timerId = setInterval(() => {
                const newTime = checkpoint.timer.totalTime + 1;
                updateCheckpoint(goal.id, checkpoint.id, {
                    timer: {
                        totalTime: newTime,
                        lastStartTime: Date.now(),
                        isRunning: true,
                        timerId,
                        tags: checkpoint.timer.tags
                    }
                });
                displayTime = newTime;
            }, 1000);
        } else {
            clearInterval(checkpoint.timer.timerId);
            updateCheckpoint(goal.id, checkpoint.id, {
                timer: {
                    ...checkpoint.timer,
                    isRunning: false,
                    timerId: null,
                    tags: checkpoint.timer.tags
                }
            });
        }
    }
    
    function endTimer() {
        clearInterval(checkpoint.timer.timerId);

        const currentTags = checkpoint.timer.tags;
        const timeSinceLastAction = currentTags.length > 0 
            ? checkpoint.timer.totalTime - currentTags[currentTags.length - 1].timerValue 
            : checkpoint.timer.totalTime;

        calculateAndAddPoints(timeSinceLastAction);

        updateCheckpoint(goal.id, checkpoint.id, {
            isCompleted: true,
            timer: {
                ...checkpoint.timer,
                isRunning: false,
                timerId: null,
                lastStartTime: 0,
                tags: checkpoint.timer.tags,
                isCompleted: true
            }
        });
    }

    function addTag() {
        const now = new Date();
        const currentTags = [...checkpoint.timer.tags];
        const timeSinceLastTag = currentTags.length > 0 
            ? checkpoint.timer.totalTime - currentTags[currentTags.length - 1].timerValue 
            : checkpoint.timer.totalTime;

        calculateAndAddPoints(timeSinceLastTag);

        const newTag = {
            timestamp: now,
            timerValue: checkpoint.timer.totalTime,
            intervalTime: timeSinceLastTag
        };

        updateCheckpoint(goal.id, checkpoint.id, {
            timer: {
                ...checkpoint.timer,
                tags: [...currentTags, newTag]
            }
        });
    }

    function calculateAndAddPoints(timeSinceLastAction) {
        const minutes = Math.floor(timeSinceLastAction / 60);
        const points = minutes * 10;
        updateGoalPoints(goal.id, points);
    }

</script>


<div class="checkpoint-container" style="bottom: {verticalPosition};">
    <div class="flex flex-col items-center">
        <div class="checkpoint-name">{checkpoint.name}</div>
        <button aria-label="Checkpoint-flag-button" class="flag-button" onclick={openCheckpoint}>
            {#if !checkpoint.isCompleted}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Z"/></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#28e28b"><path d="M200-120v-680h250q-5 19-7.5 37.5T440-726q0 121 84 200.5T720-446q20 0 40-3t40-9v138H520l-16-80H280v280h-80Zm520-806q83 0 141.5 58.5T920-726q0 83-58.5 141.5T720-526q-83 0-141.5-58.5T520-726q0-83 58.5-141.5T720-926Zm-29 290 139-138-42-42-97 95-39-39-42 43 81 81Z"/></svg>
            {/if}
        </button>
    </div>
    
    {#if showCheckpoint}
        <div transition:slide={{duration: 300}}
             class="checkpoint-popup absolute left-full ml-4 w-80 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 
                    rounded-xl p-4 shadow-xl shadow-black/20">
            <div class="name text-lg font-semibold text-slate-200 mb-4">{checkpoint.name}</div>
            
            <div class="timer-container">
                <div class="timer-display text-3xl font-mono font-bold text-cyan-500 text-center mb-4">
                    {formatTime(displayTime)}
                </div>
                
                <div class="timer-controls flex justify-center gap-4 mb-6">
                    {#if !checkpoint.timer.isCompleted}
                        <button onclick="{addTag}" class="control-btn p-3 rounded-full" aria-label="Add tag button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"/></svg>
                        </button>
                        
                        <button onclick="{playTimer}" 
                                class="control-btn p-3 rounded-full">
                            {#if checkpoint.timer.isRunning}
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z"/></svg>
                            {/if}
                        </button>
                        
                        <button onclick="{endTimer}" class="control-btn p-3 rounded-full" aria-label="End timer button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        </button>
                    {/if}
                </div>
            </div>
            
            <div class="tags-section space-y-2 max-h-60 overflow-y-auto pr-2">
                {#each checkpoint.timer.tags as tag}
                    <div class="tag-container flex items-center gap-2 p-2 bg-slate-700/20 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"/></svg>
                        <div class="tag-text text-sm text-slate-300">
                            <div class="font-medium">{formatTagTime(tag.timestamp)}</div>
                            <div class="text-slate-400 text-xs">{formatTime(tag.intervalTime)}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .checkpoint-container {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        z-index: 10;
    }

    .checkpoint-name {
        color: #e2e8f0;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .flag-button {
        padding: 0.5rem;
        border-radius: 9999px;
        transition: background-color 0.2s;
        cursor: pointer;
        background: transparent;
        border: none;
    }

    .flag-button:hover {
        background-color: rgba(51, 65, 85, 0.3);
    }

    .checkpoint-popup {
        position: absolute;
        left: calc(100% + 0.5rem);
        top: 50%;
        transform: translateY(-50%);
        width: 20rem;
        background-color: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(51, 65, 85, 0.5);
        border-radius: 0.75rem;
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .control-btn {
        color: #e2e8f0;
        background-color: transparent;
        transition: background-color 0.2s;
    }

    .control-btn:hover {
        color: #06b6d4;
    }

    .tags-section {
        scrollbar-width: thin;
        scrollbar-color: rgba(71, 85, 105, 0.5) rgba(30, 41, 59, 0.2);
    }
    
    .tags-section::-webkit-scrollbar {
        width: 4px;
    }
    
    .tags-section::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.2);
        border-radius: 2px;
    }
    
    .tags-section::-webkit-scrollbar-thumb {
        background: rgba(71, 85, 105, 0.5);
        border-radius: 2px;
    }

    :global(.control-btn svg) {
        display: block;
    }

    :global(.control-btn:hover svg) {
        transform: scale(1.1);
    }
</style>
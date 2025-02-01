<script>
    import Checkpoint from "./Checkpoint.svelte";
    import { goals } from "../stores";
    
    let {goalId, updateSelectedGoal} = $props();
    let goal = $derived($goals.find(g => g.id === goalId));
    let totalPoints = $derived(goal.totalPoints || 0);
    let maxPoints = $derived(goal.hours * 600);
    let progress = $derived(Math.min((totalPoints / maxPoints) * 100, 100));
    let showCheckpointSettings = $state(false);
    let newCheckpointId = $state(null);

    let pathHeight = $derived(`${Math.max(500, goal.checkpoints.length * 300)}px`);
    
    function addCheckpoint() {
        const checkpointId = crypto.randomUUID();
        goals.update(currentGoals => 
            currentGoals.map(g =>
                g.id === goalId
                    ? { 
                        ...g, 
                        checkpoints: [
                            { 
                                id: checkpointId,
                                name: "",
                                isCompleted: false,
                                timer: {
                                    timerId: null,
                                    totalTime: 0,
                                    isRunning: false,
                                    lastStartTime: 0,
                                    tags: []
                                },
                            },
                            ...g.checkpoints
                        ]
                    }
                    : g
            )
        );
        newCheckpointId = checkpointId;
        showCheckpointSettings = true;
    }

    function closePath() {
        updateSelectedGoal(null);
    }

    function handleNameSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        const checkpointName = formData.get("checkpointName");

        goals.update(currentGoals => 
            currentGoals.map(g => 
                g.id === goalId
                    ? {
                        ...g,
                        checkpoints: g.checkpoints.map(c => 
                            c.id === newCheckpointId
                                ? { ...c, name: checkpointName }
                                : c
                        )
                    }
                    : g
            )
        );

        showCheckpointSettings = false;
        newCheckpointId = null;
    }

</script>

<div class="path-container flex flex-col -m-[70px] gap-4 lg:gap-6 p-2 lg:p-4 h-[calc(100vh-60px)] w-full max-w-2xl mx-auto overflow-hidden">
    <div class="stats-card bg-slate-800/40 backdrop-blur-lg border border-slate-700/20 rounded-2xl p-3 lg:p-4 flex-shrink-0">
        <div class="goal-header flex items-center gap-2 lg:gap-4 mb-4 lg:mb-6">
            <span class="goal-emoji text-3xl lg:text-4xl">{goal.emoji}</span>
            <h2 class="text-xl lg:text-2xl font-semibold text-slate-200">{goal.name}</h2>
            <button aria-label="Close" onclick={closePath}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
        </div>
        
        <div class="stats-grid grid grid-cols-3 gap-2 lg:gap-4">
            <div class="stat-item flex flex-col items-center">
                <span class="text-xl lg:text-2xl font-bold text-cyan-500">{totalPoints}</span>
                <span class="text-xs lg:text-sm text-slate-400 mt-1">Points Earned</span>
            </div>
            <div class="stat-item flex flex-col items-center">
                <span class="text-xl lg:text-2xl font-bold text-cyan-500">{maxPoints}</span>
                <span class="text-xs lg:text-sm text-slate-400 mt-1">Goal Points</span>
            </div>
            <div class="stat-item flex flex-col items-center">
                <span class="text-xl lg:text-2xl font-bold text-cyan-500">{progress.toFixed(1)}%</span>
                <span class="text-xs lg:text-sm text-slate-400 mt-1">Progress</span>
            </div>
        </div>
    </div>

    <div class="path-section relative flex-1 flex justify-center overflow-y-auto scrollbar-thin scrollbar-track-slate-800/20 scrollbar-thumb-slate-600/50">
        <div class="finish-flag absolute -top-2 left-1/2 -translate-x-1/2 z-10">
            <span class="text-4xl">🏁</span>
            <div class="flag-glow absolute inset-[-50%] bg-cyan-500/20 rounded-full blur-lg"></div>
        </div>
        
        <div class="progress-line absolute left-1/2 -translate-x-1/2 w-2 bg-slate-700/50 rounded" style="height: {pathHeight};">
            <div class="line-fill absolute bottom-0 w-full bg-cyan-500 rounded" style="height: {progress}%;"></div>
            <div class="character absolute left-1/2 -translate-x-1/2 translate-y-1/2 z-20" style="bottom: calc({progress}% - 0.5rem)">
                <span class="character-emoji text-4xl">{goal.emoji}</span>
                <div class="character-glow absolute inset-[-20%] bg-cyan-500/20 rounded-full blur-lg"></div>
            </div>
        </div>

        <div class="checkpoints-container relative z-10 flex flex-col gap-6 lg:gap-8 w-full max-w-[90%] lg:max-w-md mx-auto" style="height: {pathHeight};">
            {#each goal.checkpoints as checkpoint}
                <Checkpoint {checkpoint} {goal}/>
            {/each}
        </div>
    </div>

    {#if showCheckpointSettings}
        <form class="checkpoint-form bg-slate-800/40 backdrop-blur-lg border border-slate-700/20 rounded-xl p-4" onsubmit={handleNameSubmit}>
            <input name="checkpointName" placeholder="Checkpoint name" class="w-full bg-transparent border-b border-slate-700 text-slate-200 px-2 py-1 focus:outline-none focus:border-cyan-500">
            <button type="submit" class="mt-4 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30  text-slate-200 rounded-lg border border-cyan-500/30">Save</button>
        </form>
    {/if}

    <button class="add-checkpoint-btn flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-3 
            bg-cyan-500/20 hover:bg-cyan-500/30 text-slate-200 rounded-xl border border-cyan-500/30 
            transition-colors duration-200 text-sm font-medium mx-auto" onclick="{addCheckpoint}">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
        Add Checkpoint
    </button>
</div>

<style>

    @media (max-width: 1024px) {
        .path-container {
            margin-top: 0;
        }
    }

    .line-fill {
        transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .character {
        transition: bottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .path-section {
        scrollbar-width: thin;
        scrollbar-color: rgba(71, 85, 105, 0.5) rgba(30, 41, 59, 0.2);
    }
    
    .path-section::-webkit-scrollbar {
        width: 6px;
    }
    
    .path-section::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.2);
        border-radius: 3px;
    }
    
    .path-section::-webkit-scrollbar-thumb {
        background: rgba(71, 85, 105, 0.5);
        border-radius: 3px;
    }

    .checkpoints-container {
        min-height: 500px;
        position: relative;
    }

    .progress-line {
        min-height: 500px;
    }

</style>
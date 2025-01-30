<script>
    import { fade } from 'svelte/transition';
    import GoalSettings from './GoalSettings.svelte';
    import { formatToISODate, goals } from '../stores';
    import GoalPath from './GoalPath.svelte';
    
    let selectedGoal = $state(null);
    let editingGoal = $state(null);
    let goalsContainerElement;

    function handleGoalClick(goal) {
        if (!goal.isSet) {
            editingGoal = goal;
        } else {
            selectedGoal = goal;
            goalsContainerElement.remove();
        }
    }

    function updateEditingGoal(value) {
        editingGoal = value;
    }

</script>

<div class="goals-container" bind:this={goalsContainerElement}>
    {#each $goals as goal}
        <button 
            class="goal-box"
            class:is-editing={editingGoal?.id === goal.id}
            onclick={() => {
                if (!editingGoal) {
                    handleGoalClick(goal);
                }}
            }
        >   {#if editingGoal?.id === goal.id}
                <div class="goal-settings">
                    <GoalSettings {goal} {updateEditingGoal}/>
                </div>
            {:else if !goal.isSet}
                <div class="empty-goal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="plus-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    <span class="mt-2">Add Goal</span>
                </div>
            {:else}
                <div class="goal-content">
                    <div class="goal-emoji">{goal.emoji}</div>
                    <h3 class="goal-name">{goal.name}</h3>
                    <div class="goal-details">
                        <span>{goal.hours}h goal</span>
                        <span>Deadline: {formatToISODate(goal.deadline)}</span>
                    </div>
                </div>
            {/if}
        </button>
    {/each}
</div>

{#if selectedGoal}
    <div>
        <GoalPath goalId={selectedGoal.id}/>
    </div>
{/if}

<style>
    
    .goals-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 400px;
        height: calc(100vh - 60px);
        padding: 1rem;
        margin-top: -50px;
    }

    .goal-box {
        height: 250px;
        background-color: rgb(51 65 85 / 0.5);
        backdrop-filter: blur(8px);
        border: 1px solid rgb(71 85 105 / 0.3);
        border-radius: 0.75rem;
        transition: all 0.2s ease-out;
        cursor: pointer;
        flex: 1;
        flex-shrink: 1;
    }

    .goal-box:hover {
        background-color: rgb(51 65 85 / 0.7);
        border-color: rgb(71 85 105 / 0.5);
    }

    .goal-box.is-editing {
        cursor: default;
    }

    .empty-goal {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: rgb(148 163 184);
    }

    .empty-goal:hover {
        color: rgb(226 232 240);
    }

    .goal-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        color: rgb(226 232 240);
    }

    .goal-emoji {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .goal-name {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-align: center;
    }

    .goal-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        color: rgb(148 163 184);
        font-size: 0.875rem;
    }

    .goal-settings {
        height: 100%;
    }

</style>
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

    function updateSelectedGoal(value) {
        selectedGoal = value;
        if (!goalsContainerElement) {
            
        }
    }
    

</script>

{#if !selectedGoal}
    <div class="goals-container" bind:this={goalsContainerElement}>
        {#each $goals as goal}
            <div 
                role="button"
                tabindex="0"
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
                {:else if goal.isSet}
                    <div class="goal-content">
                        <div class="goal-emoji">{goal.emoji}</div>
                        <h3 class="goal-name">{goal.name}</h3>
                        <div class="goal-details">
                            <span>{goal.hours}h goal</span>
                            <span>Deadline: {formatToISODate(goal.deadline)}</span>
                        </div>
                        <div class="goal-buttons">
                            <button class="edit-btn" aria-label="Edit goal" onclick={(e) => {
                                e.stopPropagation
                                editingGoal = goal;
                            }}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                            <button class="delete-btn" aria-label="Delete goal" onclick={(e) => {
                                e.stopPropagation()
                                goals.update(currentGoals => {
                                    return currentGoals.map(g => {
                                        if (g.id === goal.id) {
                                            return {
                                                ...g,
                                                name: "",
                                                hours: 0,
                                                deadline: "",
                                                emoji: "",
                                                isSet: false,
                                                checkpoints: []
                                            }
                                        }
                                        return g
                                    })
                                })
                            }}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                        </div>
                    </div>
                {/if}
                </div>
        {/each}
    </div>
{/if}

{#if selectedGoal}
    <div>
        <GoalPath goalId={selectedGoal.id} {updateSelectedGoal}/>
    </div>
{/if}

<style>
    
    .goals-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        max-width: 400px;
        height: calc(100vh - 60px);
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-top: -70px;
    }

    .goal-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        position: absolute;
        top: 10px;
        right: 10px;
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
        position: relative;
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
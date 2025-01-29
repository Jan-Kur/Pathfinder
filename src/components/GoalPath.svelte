<script>
    import Checkpoint from "./Checkpoint.svelte";

    let {goal} = $props();
    let checkpoints = $state([]);
    let totalPoints = $state(0);
    let maxPoints = $derived(goal.hour * 600);
    let progress = $derived(Math.min((totalPoints / maxPoints) * 100,))

</script>

<div></div>

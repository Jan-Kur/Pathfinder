<script>
    import '../app.css';
    let { children } = $props();
</script>

<style>
    :root {
        --main-bg-color: rgb(11, 15, 23);
        --main-text-color: #ffffff;
    }

    :global(html), :global(body) {
        @apply min-h-screen h-full m-0 p-0;
        background-color: var(--main-bg-color);
        color: var(--main-text-color);
    }

    .app-container {
        @apply min-h-screen flex flex-col;
    }
</style>

<div class="app-container">
    {@render children()}
</div>
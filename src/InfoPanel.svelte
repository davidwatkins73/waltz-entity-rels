<script>
    import {selectedTag, selectedNode} from "./data-store";
    import NodePanel from "./NodePanel.svelte";
    import {tags} from "./model/tags";
</script>


<div class="info-panel">
    <label for="tag-selector">Use cases:</label>
    <select bind:value={$selectedTag}
            id="tag-selector">
        {#each tags as tag}
            <option value={tag}>
                {tag.name}
            </option>
        {/each}
    </select>

    <span>...or <button on:click={() => $selectedTag = null}> show combined diagram</button></span>

    {#if $selectedTag}
        <label for="desc">Description</label>
        <div id="desc">
            {#each $selectedTag.description as para}
                <p>
                    {para}
                </p>
            {/each}
        </div>
    {/if}

    {#if $selectedNode}
        <NodePanel/>
    {/if}
</div>

<style>

    .info-panel {

    }

    label {
        font-weight: bolder;
    }

    p {
        margin: 8px;
    }
</style>
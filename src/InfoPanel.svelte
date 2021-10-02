<script>
    import {selectedTag, tags} from "./data-store";

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

    {#if $selectedTag}
        <label for="desc">Description</label>
        <div id="desc">
            {#each $selectedTag?.description as para}
                <p>
                    {para}
                </p>
            {/each}
        </div>
    {/if}
</div>

<style>
    .info-panel {
        width: 35%;
        display: inline-block;
        vertical-align: top;
        font-size: larger;
    }

    label {
        font-weight: bolder;
    }
</style>
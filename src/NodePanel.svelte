<script>
    import {graphModel, selectedNode, selectedTag} from "./data-store";
    import {relationships} from "./model/relationships";

    import _ from "lodash";

    $: rels = $graphModel && $selectedNode && _.filter(
        $graphModel.links,
        r => (r.source.id === $selectedNode.id) || (r.target.id === $selectedNode.id));

    $: useCases = $selectedNode && _.chain(relationships)
        .filter(r => (r.source.id === $selectedNode.id) || (r.target.id === $selectedNode.id))
        .flatMap(r => r.tags)
        .uniq()
        .reject(t => t === $selectedTag)
        .value();

</script>


<div class="node-info">
    <h3 style={`border-top-color: ${$selectedNode.family.color}`}>
        Entity: {$selectedNode.name}
    </h3>
    <div>
        {#each $selectedNode.description || [] as para}
            <p>{para}</p>
        {/each}
    </div>

    <table>
        <thead>
        <tr>
            <th colspan="3">Relationships</th>
        </tr>
        <tr>
            <th>Source</th>
            <th>Relation</th>
            <th>Target</th>
        </tr>
        </thead>
        <tbody>
        {#each rels as rel}
            <tr>
                <td>
                    <button class="btn-link"
                            on:click={() => $selectedNode = rel.source}>
                        {rel.source.name}
                    </button>
                </td>
                <td>{rel.type.name}</td>
                <td>
                    <button class="btn-link"
                            on:click={() => $selectedNode = rel.target}>
                        {rel.target.name}
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>

    {#if useCases}
        <label class="use-cases"
               for="use-cases">
            Appears in other use cases:
        </label>
        <ul id="use-cases">
            {#each useCases as useCase}
                <li>
                    <button class="btn-link"
                            on:click={() => $selectedTag = useCase}>
                        {useCase.name}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>


<style>
    .node-info {
        padding-top: 0.5em;
    }

    h3 {
        border-top-width: 3px;
        padding-top: 0.5em;
        border-top-style: solid;
    }

    table {
        width: 100%;
        border: 1px solid #eee;
    }

    th {
        text-align: left;
    }

    .use-cases {
        padding-top: 1.5em;
    }

    .btn-link {
        background: none!important;
        border: none;
        padding: 0!important;
        /*optional*/
        font-family: arial, sans-serif;
        /*input has OS specific font-family*/
        color: #069;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
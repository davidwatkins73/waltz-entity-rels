<script>
    import {selectedTag, entities, relationships} from "./data-store.js";
    import _ from "lodash";
    import Graph from "./Graph.svelte";
    import InfoPanel from "./InfoPanel.svelte";

    let elem;

    $: links = relationships
        .filter(d => $selectedTag === null || _.includes(d.tags, $selectedTag))
        .map(d => {
            let nodeProps = {
                id: d.source.id + "_" + d.target.id,
                source: d.source.id,
                target: d.target.id,
                value: d.source.primary ? 7 : 3 + d.target.primary ? 7 : 3
            };
            return Object.assign({}, d, nodeProps)
        });

    $: taggedNodeIds = _
        .chain(links)
        .flatMap(d => [d.source, d.target])
        .uniq()
        .value();

    $: nodes = entities
        .filter(d => _.includes(taggedNodeIds, d.id))
        .map(d => Object.create(d));

</script>

<Graph {nodes}
       {links}/>

<InfoPanel/>

<style>
</style>
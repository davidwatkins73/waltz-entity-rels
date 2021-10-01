<script>
    import {model} from "./data-store.js";
    import _ from "lodash";
    import * as d3 from "d3";

    function linkToId(d) {
        return d.source + "_" + d.target;
    }

    let elem;

    const width = 1000;
    const height = 700;

    $: tags = _.values($model.tags);
    let selectedTag = _.find(tags, t => t.name === 'Landscape');

    $: links = $model
        .relationships
        .filter(d => selectedTag === null || _.includes(d.tags, selectedTag))
        .map(d => Object.assign(
            {},
            d,
            {
                id: d.source.id + "_" + d.target.id,
                source: d.source.id,
                target: d.target.id,
                value: d.source.primary ? 7 : 3 + d.target.primary ? 7 : 3
            }));

    $: taggedNodeIds = _
        .chain(links)
        .flatMap(d => [d.source, d.target])
        .uniq()
        .value();

    $: nodes = $model
        .entities
        .filter(d => _.includes(taggedNodeIds, d.id))
        .map(d => Object.create(d));

    $: simulation = d3
        .forceSimulation(nodes, d => d.id)
        .force("link", d3
            .forceLink(links, linkToId)
            .id(d => d.id)
            .distance(80))
        .force("charge", d3.forceManyBody().strength(-80))
        .force("collide", d3.forceCollide().radius(50))
        .force("center", d3.forceCenter(width / 2, height / 2));

    $: {
        let svg = d3
            .select(elem)
            .attr("viewBox", [0, 0, width, height]);

        let link = svg
            .select(".links")
            .attr("stroke", "#bbb")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links, linkToId)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        let node = svg
            .select(".nodes")
            .selectAll(".node")
            .data(nodes, d => d.id)
            .join("g")
            .classed("node", true)
            .attr("opacity", d => _.includes(taggedNodeIds, d.id)
                ? 0.8
                : 0.2)
            .call(drag(simulation));

        node
            .append("circle")
            .attr("r", d => d.primary ? 7 : 5)
            .attr("fill", d => d.family.color);

        node
            .append("text")
            .attr("fill", "#444")
            .attr("dy", 20)
            .attr("font-size", d => d.primary ? "20" : "18")
            .attr("dx", d => d.name.length * -1)
            .text(d => d.name);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x} ${d.y})`)
        });
    }

    function drag(simulation) {

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

</script>


<svg width="55%"
     bind:this={elem}>
    <g class="nodes"/>
    <g class="links"/>
</svg>


<div class="info-panel">
    <label for="tag-selector">Use cases:</label>
    <select bind:value={selectedTag} id="tag-selector">
        {#each tags as tag}
            <option value={tag}>
                {tag.name}
            </option>
        {/each}
    </select>

    {#if selectedTag}
    <label for="desc">Description</label>
    <div id="desc">
        {#each selectedTag?.description as para}
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
    svg {
        border: 1px solid #ccc;
    }

    :global(.node) {
        pointer-events: all;
        cursor: move;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    :global(.node text) {
        text-anchor: middle;
    }

    label {
        font-weight: bolder;
    }
</style>
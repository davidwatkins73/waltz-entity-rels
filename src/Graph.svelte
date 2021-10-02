<script>
    import * as d3 from "d3";

    export let nodes = [];
    export let links = [];

    function linkToId(d) {
        return d.source + "_" + d.target;
    }

    const width = 800;
    const height = 600;

    let elem;

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
            .call(drag(simulation));

        node
            .append("circle")
            .attr("r", d => d.primary ? 7 : 5)
            .attr("fill", d => d.family.color);

        node
            .append("text")
            .attr("fill", "#444")
            .attr("dy", 20)
            .attr("font-size", d => d.primary ? "19" : "18")
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

<style>
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
</style>
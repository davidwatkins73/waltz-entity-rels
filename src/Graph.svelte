<script>
    import * as d3 from "d3";
    import {selectedNode, graphModel} from "./data-store";


    function linkToId(d) {
        return d.source + "_" + d.target;
    }

    const width = 800;
    const height = 600;

    let elem;

    $: simulation = d3
        .forceSimulation($graphModel.nodes, d => d.id)
        .force("link", d3
            .forceLink($graphModel.links, linkToId)
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
            .data($graphModel.links, linkToId)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value))
            .attr("marker-end", "url(#arrow)");

        let node = svg
            .select(".nodes")
            .selectAll(".node")
            .data($graphModel.nodes, d => d.id);

        const newNode = node
            .enter()
            .append("g")
            .classed("node", true)
            .on("click", (evt, d) => $selectedNode = d)
            .call(drag(simulation));

        newNode
            .append("circle")
            .attr("r", d => d.primary ? 7 : 5)
            .attr("fill", d => d.family.color);

        newNode
            .append("text")
            .attr("fill", "#444")
            .attr("dy", 20)
            .attr("font-size", 18)
            .attr("dx", d => d.name.length * -1)
            .text(d => d.name);

        node.exit().remove();

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            newNode
                .merge(node)
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
    <defs>
        <!-- arrowhead marker definition -->
        <marker id="arrow"
                viewBox="0 0 10 10"
                refX="15" refY="5"
                fill="#ccc"
                opacity="0.5"
                markerWidth="4"
                markerHeight="4"
                orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
    </defs>
    <g class="links"/>
    <g class="nodes"/>
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
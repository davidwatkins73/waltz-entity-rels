import {derived, writable} from "svelte/store";
import _ from "lodash";
import {tagMap} from "./model/tags";
import {entities} from "./model/entities";
import {relationships} from "./model/relationships";

export const selectedTag = writable(tagMap.bcbs);
export const selectedNode = writable(null);

export const graphModel = derived(
    [selectedTag],
    ([tag]) => {
        selectedNode.set(null);
        const links = relationships
            .filter(d => tag === null || _.includes(d.tags, tag))
            .map(d => {
                let nodeProps = {
                    id: d.source.id + "_" + d.target.id,
                    source: d.source.id,
                    target: d.target.id,
                    value: d.source.primary ? 7 : 3 + d.target.primary ? 7 : 3
                };
                return Object.assign({}, d, nodeProps)
            });

        const taggedNodeIds = _
            .chain(links)
            .flatMap(d => [d.source, d.target])
            .uniq()
            .value();

        const nodes = entities
            .filter(d => _.includes(taggedNodeIds, d.id))
            .map(d => Object.create(d));

        return {nodes, links};
    });

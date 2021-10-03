import {entityMap} from "./entities";
import {tagMap} from "./tags";

const relTypes = {
    owns: {id: 1, name: "Owns"},
    has: {id: 2, name: "Has"},
    describes: {id: 2, name: "Describes"},
    refs: {id: 2, name: "References"},
    aggregates: {id: 2, name: "Aggregates"},
};

export const relationships = [
    { source: entityMap.actor, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.application, target: entityMap.assessment, type: relTypes.has,  tags: [tagMap.landscape, tagMap.records]},
    { source: entityMap.application, target: entityMap.attestation, type: relTypes.has,  tags: [tagMap.surveys]},
    { source: entityMap.application, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.application, target: entityMap.cost, type: relTypes.has,  tags: []},
    { source: entityMap.application, target: entityMap.measurableRating, type: relTypes.has,  tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.application, target: entityMap.surveyInstance, type: relTypes.has,  tags: [tagMap.records, tagMap.surveys, tagMap.gov]},
    { source: entityMap.assessment, target: entityMap.ratingSchemeItem, type: relTypes.has,  tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.assessmentDefinition, target: entityMap.assessment, type: relTypes.has,  tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.assessmentDefinition, target: entityMap.ratingScheme, type: relTypes.has,  tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.changeInitiative, target: entityMap.application, type: relTypes.refs,  tags: [tagMap.landscape, tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.assessment, type: relTypes.has,  tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.assessment, type: relTypes.has,  tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.bookmark, type: relTypes.has,  tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.involvement, type: relTypes.has,  tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.surveyInstance, type: relTypes.has,  tags: [tagMap.surveys, tagMap.gov]},
    { source: entityMap.costKind, target: entityMap.cost, type: relTypes.has,  tags: []},
    { source: entityMap.dataType, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.dataType, target: entityMap.logicalFlow, type: relTypes.describes,  tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.flowDiagram, target: entityMap.logicalFlow, type: relTypes.aggregates,  tags: [tagMap.bcbs]},
    { source: entityMap.involvement, target: entityMap.application, type: relTypes.refs,  tags: [tagMap.landscape]},
    { source: entityMap.involvement, target: entityMap.measurable, type: relTypes.has,  tags: []},
    { source: entityMap.involvement, target: entityMap.orgUnit, type: relTypes.has,  tags: []},
    { source: entityMap.involvement, target: entityMap.person, type: relTypes.refs,  tags: [tagMap.landscape, tagMap.gov]},
    { source: entityMap.involvementKind, target: entityMap.involvement, type: relTypes.has,  tags: [tagMap.gov]},
    { source: entityMap.logicalFlow, target: entityMap.actor, type: relTypes.refs,  tags: [tagMap.bcbs]},
    { source: entityMap.logicalFlow, target: entityMap.application, type: relTypes.refs,  tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.logicalFlow, target: entityMap.physicalFlow, type: relTypes.owns,  tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.measurable, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.measurableCategory, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.measurableCategory, target: entityMap.measurable, type: relTypes.owns,  tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.measurableCategory, target: entityMap.ratingScheme, type: relTypes.has,  tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.measurableRating, target: entityMap.measurable, type: relTypes.refs,  tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.measurableRating, target: entityMap.ratingSchemeItem, type: relTypes.refs,  tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.orgUnit, target: entityMap.application, type: relTypes.owns,  tags: [tagMap.landscape, tagMap.bcbs, tagMap.ft]},
    { source: entityMap.orgUnit, target: entityMap.bookmark, type: relTypes.has,  tags: []},
    { source: entityMap.physicalFlow, target: entityMap.bookmark, type: relTypes.has,  tags: [tagMap.bcbs]},
    { source: entityMap.physicalSpecification, target: entityMap.physicalFlow, type: relTypes.describes,  tags: [tagMap.bcbs]},
    { source: entityMap.physicalSpecification, target: entityMap.specificationAttribute, type: relTypes.aggregates,  tags: [tagMap.bcbs]},
    { source: entityMap.ratingScheme, target: entityMap.ratingSchemeItem, type: relTypes.has,  tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.specificationAttribute, target: entityMap.dataElement, type: relTypes.refs,  tags: [tagMap.bcbs]},
    { source: entityMap.surveyInstance, target: entityMap.surveyInstanceRecipient, type: relTypes.has,  tags: [tagMap.surveys]},
    { source: entityMap.surveyInstance, target: entityMap.surveyQuestionResponse, type: relTypes.has,  tags: [tagMap.surveys]},
    { source: entityMap.surveyInstanceRecipient, target: entityMap.person, type: relTypes.has,  tags: [tagMap.surveys]},
    { source: entityMap.surveyQuestionResponse, target: entityMap.surveyQuestion, type: relTypes.refs,  tags: [tagMap.surveys]},
    { source: entityMap.surveyTemplate, target: entityMap.surveyInstance, type: relTypes.has,  tags: [tagMap.surveys, tagMap.records]},
    { source: entityMap.surveyTemplate, target: entityMap.surveyQuestion, type: relTypes.has,  tags: [tagMap.surveys]},
];


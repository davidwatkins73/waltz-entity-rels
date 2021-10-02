import {writable} from "svelte/store";
import _ from "lodash";


const families = {
    app: { color: "green" },
    ci: { color: "red" },
    person: { color: "orange"},
    flow: { color: "blue"},
    taxonomy: { color: "brown"},
    survey: { color: "purple"},
    misc: { color: "pink"}
};


const entityMap = {
    application: {id: 1, name: 'Application', primary: true, family: families.app},
    orgUnit: {id: 2, name: 'Organisational Unit', primary: true, family: families.app},
    changeInitiative: {id: 3, name: 'Change Initiative', primary: true, family: families.ci},
    person: {id: 4, name: 'Person', primary: true, family: families.person},
    measurable: {id: 5, name: 'Measurable', primary: true, family: families.taxonomy},
    measurableCategory: {id: 6, name: 'Measurable Category', primary: true, family: families.taxonomy},
    measurableRating: {id: 7, name: 'Measurable Rating',  family: families.taxonomy},
    assessment: {id: 8, name: 'Assessment',  family: families.taxonomy},
    assessmentDefinition: {id: 9, name: 'Assessment Definition',  family: families.taxonomy},
    involvement: {id: 10, name: 'Involvement', family: families.person},
    involvementKind: {id: 11, name: 'Involvement Kind', family: families.person},
    actor: {id: 12, name: 'Actor', primary: true, family: families.app},
    logicalFlow: {id: 13, name: 'Logical Flow', primary: true, family: families.flow},
    physicalFlow: {id: 14, name: 'Physical Flow', family: families.flow},
    physicalSpecification: {id: 15, name: 'Physical Specification', family: families.flow},
    dataType: {id: 16, name: 'Data Type', primary: true, family: families.flow},
    surveyTemplate: {id: 17, name: 'Survey Template', family: families.survey},
    surveyQuestion: {id: 18, name: 'Survey Question', family: families.survey},
    surveyInstance: {id: 19, name: 'Survey Instance', family: families.survey},
    surveyQuestionResponse: {id: 20, name: 'Survey Question Response', family: families.survey},
    bookmark: {id: 21, name: 'Bookmark',  family: families.misc},
    cost: {id: 22, name: 'Cost',  family: families.misc},
    costKind: {id: 23, name: 'Cost Kind',  family: families.misc},
    flowDiagram: {id: 24, name: 'Flow Diagram', family: families.flow},
    ratingScheme: {id: 25, name: 'Rating Scheme', family: families.taxonomy},
    ratingSchemeItem: {id: 26, name: 'Rating Scheme Item', family: families.taxonomy},
    surveyInstanceRecipient: {id: 27, name: 'Survey Instance Recipient', family: families.survey},
    attestation: {id: 28, name: 'Attestation', family: families.survey},
    specificationAttribute: {id: 29, name: 'Specification Attribute', family: families.flow},
    dataElement: {id: 30, name: 'Data Element', family: families.flow}
};

export const entities = _.values(entityMap);

const relTypes = {
    owns: {id: 1, name: ["Owns", "Owned by"]},
    has: {id: 2, name: ["Has", "Referenced"]},
    describes: {id: 2, name: ["Described By", "Describes"]},
    refs: {id: 2, name: ["References", "Referenced By"]},
};

const tagMap = {
    landscape: {
        name: "Landscape",
        description:  [`
            This example shows a typical minimal set of entities needed to allow Waltz to show a basic view of an 
            organisations technical landscape. `]
    },
    bcbs: {
        name: "BCBS239",
        description:  [`
            To help answer BCBS239 questions, Waltz is used to create detailed representations of flows between applications.
            `,`
            Waltz captures information from a logical flow (which states that two applications, or actors, are connected) through to
            physical manifestations of flows and even down to the specification / field level.
            `,` 
            Flow diagrams are used to provide depictions of data lineage across multiple 'hops'.`]
    },
    ft: {
        name: "Functional Taxonomy and Process Mapping",
        description:  [`
            Waltz supports system definable taxonomies (measurable categories) which can be linked to applications 
            through ratings with custom values (rating schemes, e.g. [buy,sell,hold] or  [strategic,non-strategic]
            `, `
            Additionally assessments can be linked to applications to provide one-off datapoints (as opposed to a 
            taxonomy of related datapoints).  Common examples of assessments include: 'Legal Holds', 'SDLC Status' etc)
            `
        ]
    },
    records: {
        name: "Records Management",
        description:  [`
            In this example the Records Management team combined surveys, assessments and measurable ratings to 
            create a simple workflow system which enriches Waltz at each step of the process.
            `, `
            The data is now being used to cross check other data points in Waltz (i.e. see if there is alignment
            between Payment Records, Payment Functions, Payment Processes and the datatypes aligned to Payments`]
    },
    surveys: {
        name: "Surveys & Attestations",
        description:  [`
            Not so much a use case, but a very commonly used part of Waltz is the ability to issue and track
            both attestations and surveys
            `,`
            Surveys can (currently) be issued against either Change Initiatives or Applications and can be bulk
            issued by a group selector (i.e. an org unit, a CIO's portfolio of apps, all apps which perform a 
            certain function etc) and assigned to people via their roles (i.e. assign to the app owner and their
            delegates).
            `,`
            The question types in Waltz leverage the entities in Waltz and can include references to people, apps 
            and taxonomies (and lots more)
            `, `
            Attestation requests can be kicked off in a similar way to survey issuance.  Attestations can be against
            dataflows (logical and physical) or measurable (taxonomy) ratings.` ]
    },
    gov: {
        name: "Programme Governance",
        description: []
    }
};

export const tags = _.values(tagMap);


export const relationships = [
    { source: entityMap.actor, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.application, target: entityMap.assessment, type: relTypes.has, cardinality: "1n", tags: [tagMap.landscape, tagMap.records]},
    { source: entityMap.application, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.application, target: entityMap.cost, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.application, target: entityMap.involvement, type: relTypes.has, cardinality: "1n", tags: [tagMap.landscape]},
    { source: entityMap.application, target: entityMap.logicalFlow, type: relTypes.has, cardinality: "1n", tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.application, target: entityMap.measurableRating, type: relTypes.has, cardinality: "1n", tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.application, target: entityMap.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tagMap.records, tagMap.surveys, tagMap.gov]},
    { source: entityMap.application, target: entityMap.attestation, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys]},
    { source: entityMap.assessment, target: entityMap.ratingSchemeItem, type: relTypes.has, cardinality: "1n", tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.assessmentDefinition, target: entityMap.assessment, type: relTypes.has, cardinality: "1n", tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.assessmentDefinition, target: entityMap.ratingScheme, type: relTypes.has, cardinality: "1n", tags: [tagMap.records, tagMap.ft]},
    { source: entityMap.changeInitiative, target: entityMap.application, type: relTypes.refs, cardinality: "1n", tags: [tagMap.landscape, tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.assessment, type: relTypes.has, cardinality: "1n", tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.assessment, type: relTypes.has, cardinality: "1n", tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.involvement, type: relTypes.has, cardinality: "1n", tags: [tagMap.gov]},
    { source: entityMap.changeInitiative, target: entityMap.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys, tagMap.gov]},
    { source: entityMap.costKind, target: entityMap.cost, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.dataType, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.flowDiagram, target: entityMap.logicalFlow, type: relTypes.has, cardinality: "1n", tags: [tagMap.bcbs]},
    { source: entityMap.involvement, target: entityMap.person, type: relTypes.refs, cardinality: "1n", tags: [tagMap.landscape, tagMap.gov]},
    { source: entityMap.involvementKind, target: entityMap.involvement, type: relTypes.has, cardinality: "1n", tags: [tagMap.gov]},
    { source: entityMap.logicalFlow, target: entityMap.actor, type: relTypes.has, cardinality: "1", tags: [tagMap.bcbs]},
    { source: entityMap.logicalFlow, target: entityMap.dataType, type: relTypes.describes, cardinality: "1n", tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.logicalFlow, target: entityMap.physicalFlow, type: relTypes.has, cardinality: "1n", tags: [tagMap.landscape, tagMap.bcbs]},
    { source: entityMap.measurable, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.measurable, target: entityMap.involvement, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.measurableCategory, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.measurableCategory, target: entityMap.measurable, type: relTypes.owns, cardinality: "1n", tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.measurableCategory, target: entityMap.ratingScheme, type: relTypes.has, cardinality: "1", tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.measurableRating, target: entityMap.measurable, type: relTypes.refs, cardinality: "1", tags: [tagMap.landscape, tagMap.ft, tagMap.records]},
    { source: entityMap.measurableRating, target: entityMap.ratingSchemeItem, type: relTypes.refs, cardinality: "1", tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.orgUnit, target: entityMap.application, type: relTypes.owns, cardinality: "1n", tags: [tagMap.landscape, tagMap.bcbs, tagMap.ft]},
    { source: entityMap.orgUnit, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.orgUnit, target: entityMap.involvement, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entityMap.physicalFlow, target: entityMap.bookmark, type: relTypes.has, cardinality: "1n", tags: [tagMap.bcbs]},
    { source: entityMap.physicalSpecification, target: entityMap.physicalFlow, type: relTypes.describes, cardinality: "1n", tags: [tagMap.bcbs]},
    { source: entityMap.physicalSpecification, target: entityMap.physicalFlow, type: relTypes.describes, cardinality: "1n", tags: [tagMap.bcbs]},
    { source: entityMap.physicalSpecification, target: entityMap.specificationAttribute, type: relTypes.describes, cardinality: "1n", tags: [tagMap.bcbs]},
    { source: entityMap.specificationAttribute, target: entityMap.dataElement, type: relTypes.describes, cardinality: "1", tags: [tagMap.bcbs]},
    { source: entityMap.ratingScheme, target: entityMap.ratingSchemeItem, type: relTypes.has, cardinality: "1n", tags: [tagMap.ft, tagMap.records]},
    { source: entityMap.surveyInstance, target: entityMap.surveyQuestionResponse, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys]},
    { source: entityMap.surveyInstance, target: entityMap.surveyInstanceRecipient, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys]},
    { source: entityMap.surveyInstanceRecipient, target: entityMap.person, type: relTypes.has, cardinality: "1", tags: [tagMap.surveys]},
    { source: entityMap.surveyQuestionResponse, target: entityMap.surveyQuestion, type: relTypes.refs, cardinality: "1n", tags: [tagMap.surveys]},
    { source: entityMap.surveyTemplate, target: entityMap.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys, tagMap.records]},
    { source: entityMap.surveyTemplate, target: entityMap.surveyQuestion, type: relTypes.has, cardinality: "1n", tags: [tagMap.surveys]},
];


export const selectedTag = writable(tagMap.bcbs);


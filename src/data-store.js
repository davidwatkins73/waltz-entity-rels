import {writable} from "svelte/store";
import _ from "lodash";

const families = {
    app: { color: "green" },
    ci: { color: "red" },
    person: { color: "orange"},
    flow: { color: "blue"},
    taxonomy: { color: "brown"},
    survey: { color: "pink"},
    misc: { color: "yellow"}
}

const entities = {
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
    attestation: {id: 28, name: 'Attestation', family: families.survey}
};

const relTypes = {
    owns: {id: 1, name: ["Owns", "Owned by"]},
    has: {id: 2, name: ["Has", "Referenced"]},
    describes: {id: 2, name: ["Described By", "Describes"]},
    refs: {id: 2, name: ["References", "Referenced By"]},
};

const tags = {
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
}
const relationships = [
    { source: entities.actor, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.application, target: entities.assessment, type: relTypes.has, cardinality: "1n", tags: [tags.landscape, tags.records]},
    { source: entities.application, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.application, target: entities.cost, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.application, target: entities.involvement, type: relTypes.has, cardinality: "1n", tags: [tags.landscape]},
    { source: entities.application, target: entities.logicalFlow, type: relTypes.has, cardinality: "1n", tags: [tags.landscape, tags.bcbs]},
    { source: entities.application, target: entities.measurableRating, type: relTypes.has, cardinality: "1n", tags: [tags.landscape, tags.ft, tags.records]},
    { source: entities.application, target: entities.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tags.records, tags.surveys, tags.gov]},
    { source: entities.application, target: entities.attestation, type: relTypes.has, cardinality: "1n", tags: [tags.surveys]},
    { source: entities.assessment, target: entities.ratingSchemeItem, type: relTypes.has, cardinality: "1n", tags: [tags.records, tags.ft]},
    { source: entities.assessmentDefinition, target: entities.assessment, type: relTypes.has, cardinality: "1n", tags: [tags.records, tags.ft]},
    { source: entities.assessmentDefinition, target: entities.ratingScheme, type: relTypes.has, cardinality: "1n", tags: [tags.records, tags.ft]},
    { source: entities.changeInitiative, target: entities.application, type: relTypes.refs, cardinality: "1n", tags: [tags.landscape, tags.gov]},
    { source: entities.changeInitiative, target: entities.assessment, type: relTypes.has, cardinality: "1n", tags: [tags.gov]},
    { source: entities.changeInitiative, target: entities.assessment, type: relTypes.has, cardinality: "1n", tags: [tags.gov]},
    { source: entities.changeInitiative, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: [tags.gov]},
    { source: entities.changeInitiative, target: entities.involvement, type: relTypes.has, cardinality: "1n", tags: [tags.gov]},
    { source: entities.changeInitiative, target: entities.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tags.surveys, tags.gov]},
    { source: entities.costKind, target: entities.cost, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.dataType, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.flowDiagram, target: entities.logicalFlow, type: relTypes.has, cardinality: "1n", tags: [tags.bcbs]},
    { source: entities.involvement, target: entities.person, type: relTypes.refs, cardinality: "1n", tags: [tags.landscape, tags.gov]},
    { source: entities.involvementKind, target: entities.involvement, type: relTypes.has, cardinality: "1n", tags: [tags.gov]},
    { source: entities.logicalFlow, target: entities.actor, type: relTypes.has, cardinality: "1", tags: [tags.bcbs]},
    { source: entities.logicalFlow, target: entities.dataType, type: relTypes.describes, cardinality: "1n", tags: [tags.landscape, tags.bcbs]},
    { source: entities.logicalFlow, target: entities.physicalFlow, type: relTypes.has, cardinality: "1n", tags: [tags.landscape, tags.bcbs]},
    { source: entities.measurable, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.measurable, target: entities.involvement, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.measurableCategory, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.measurableCategory, target: entities.measurable, type: relTypes.owns, cardinality: "1n", tags: [tags.landscape, tags.ft, tags.records]},
    { source: entities.measurableCategory, target: entities.ratingScheme, type: relTypes.has, cardinality: "1", tags: [tags.ft, tags.records]},
    { source: entities.measurableRating, target: entities.measurable, type: relTypes.refs, cardinality: "1", tags: [tags.landscape, tags.ft, tags.records]},
    { source: entities.measurableRating, target: entities.ratingSchemeItem, type: relTypes.refs, cardinality: "1", tags: [tags.ft, tags.records]},
    { source: entities.orgUnit, target: entities.application, type: relTypes.owns, cardinality: "1n", tags: [tags.landscape, tags.bcbs, tags.ft]},
    { source: entities.orgUnit, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.orgUnit, target: entities.involvement, type: relTypes.has, cardinality: "1n", tags: []},
    { source: entities.physicalFlow, target: entities.bookmark, type: relTypes.has, cardinality: "1n", tags: [tags.bcbs]},
    { source: entities.physicalSpecification, target: entities.physicalFlow, type: relTypes.describes, cardinality: "1n", tags: [tags.bcbs]},
    { source: entities.physicalSpecification, target: entities.physicalFlow, type: relTypes.describes, cardinality: "1n", tags: [tags.bcbs]},
    { source: entities.ratingScheme, target: entities.ratingSchemeItem, type: relTypes.has, cardinality: "1n", tags: [tags.ft, tags.records]},
    { source: entities.surveyInstance, target: entities.surveyQuestionResponse, type: relTypes.has, cardinality: "1n", tags: [tags.surveys]},
    { source: entities.surveyInstance, target: entities.surveyInstanceRecipient, type: relTypes.has, cardinality: "1n", tags: [tags.surveys]},
    { source: entities.surveyInstanceRecipient, target: entities.person, type: relTypes.has, cardinality: "1", tags: [tags.surveys]},
    { source: entities.surveyQuestionResponse, target: entities.surveyQuestion, type: relTypes.refs, cardinality: "1n", tags: [tags.surveys]},
    { source: entities.surveyTemplate, target: entities.surveyInstance, type: relTypes.has, cardinality: "1n", tags: [tags.surveys, tags.records]},
    { source: entities.surveyTemplate, target: entities.surveyQuestion, type: relTypes.has, cardinality: "1n", tags: [tags.surveys]},
];


export const model = writable({
    entities: _.values(entities),
    relationships,
    tags
});


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


export const entityMap = {
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


entityMap.application.description = [
    `Applications are one of the fundamental entities in Waltz.  Each app has basic info such as name and status (dev, prod etc).`,
    `Each app is owned by an organisational unit and are referenced by many other entities within Waltz.`,
];

entityMap.orgUnit.description = [
    `Organisational Units are a fundamental hierarchical, structural element in Waltz.`,
    `Every App belongs to an org unit and they are frequently used as a unit of aggregation/reporting.  This aggregation happens automatically.`
];

entityMap.flowDiagram.description = [
    `Flow Diagrams are used to depict data lineage through an organisation.  They are a combination of a diagram showing flows and apps and a bill of materials (BoM) which allows Waltz to aggregate diagram content.`
];

entityMap.logicalFlow.description = [
    `Logical Flows link applications (and sometimes actors).  The logical flow basically states that there is some form of communication from the source to the target system.`,
    `Logical Flows can be enriched with Data Types and are referenced by physical flows and diagrams.`
];

entityMap.actor.description = [
    `Actors are used as placeholders to represent non-application systems.`,
    `These are typically institutions (Bank of England) or named roles (Chief Risk Officer). There primary usage is in representing flows.`,
    `Actors can be classified as internal or external.`
];

entityMap.involvement.description = [
    `Involvements are used to link people to entities with a named involvement kind.`,
    `Examples include: App Owners, Data Content Owners, Responsible CIO, App Sponsor etc.`
];
export const entities = _.values(entityMap);
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
    attestation: {id: 28, name: 'Attestation', family: families.misc},
    specificationAttribute: {id: 29, name: 'Specification Attribute', family: families.flow},
    dataElement: {id: 30, name: 'Data Element', family: families.flow},
    attestationRecipient: {id: 31, name: 'Attestation Recipient', family: families.misc},
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

entityMap.physicalFlow.description = [
    `Physical Flows are used to record manifestations of logical flows.`,
    `They are owned by logical flows, which provide the source and target.  Each physical flow details frequency, transport mechanisms etc.`
];

entityMap.physicalSpecification.description = [
    `Each physical flow can be further defined by a specification.`,
    `The specification details the metadata which describes the content of the flow and may be shared across flows.`
];

entityMap.specificationAttribute.description = [
    `Each physical spec may contain a list of attributes.`,
    `Attributes can be linked to a Data Dictionary terms (aka Data Element)`
];

entityMap.dataElement.description = [
    `Data Elements (aka Data Dictionary terms) provide standardised definitions of spec attributes`
];

entityMap.bookmark.description = [
    `Waltz supports 'typed' bookmarks.  These are simply categorized links to external resources`
];

entityMap.attestation.description = [
    `Attestations are used to manually verify data correctness.`,
    `Like surveys, attestations can be issued against a group of applications and are assigned to people with specific involvements to those apps.`
];

entityMap.measurableCategory.description = [
    `Categories are used to group related measurables together, forming a taxonomy.`,
    `Examples include; Functional, Process, and Product taxonomies.`
];

entityMap.measurable.description = [
    `A single entry in a hierarchical measurable category.`,
    `Application use measurables to describe themselves (i.e. a functional profile).`,
];

entityMap.measurableRating.description = [
    `Used to link applications with measurables (taxonomy items) using a specific rating.`,
    `For example: Application 'X' is linked to 'Payments' with a rating of 'Invest'.`,
];

entityMap.ratingScheme.description = [
    `Groups a set of rating items into a single scheme which can be used by measurable ratings or assessments.`,
    `For example: the 'Investment' scheme may have values: 'Invest', 'Hold', 'Disinvest'.`,
];

entityMap.ratingSchemeItem.description = [
    `A single rating item which belongs to a parent scheme.`,
    `Each item has a name, description and a color used when presenting ratings visually.`,
    'Additionally, ratings can be restricted to certain roles or may be defined read only (if assigned programmatically)'
];

entityMap.surveyTemplate.description = [
    `A survey template groups a collection of questions into a single survey.  The template also defines the applicability of the survey (e.g. for applications only)`,
];

entityMap.surveyQuestion.description = [
    `A single question in a survey.  Numerous types of question are supported including:`,
    `Basic types (numbers, strings, enums, list), people refs, app refs, taxonomy trees etc`,
    `Questions can have predicates which control when they are presented to the user (ie. if Q1 is 'No' then don't ask Q2)`
];

entityMap.surveyInstance.description = [
    `An instance of a survey template assigned to a entity (either an app or change initiative).`,
    `Each instance has it's own lifecycle and may have one or more recipients.`
];

entityMap.assessmentDefinition.description = [
    `Assessments provide a single data point against an entity (typically Apps or Change Initiatives).`,
    `The Assessment Definition describes the assessment, details where it can be used and links a rating scheme (providing an enumerations of possible values).`,
];

entityMap.assessment.description = [
    `Assessments provide singular data points against an entity. The provide a mapping to between the entity, the definition and the rating item.`,
    `They may be declared read only or have their access limited via the associated definition.`,
];


export const entities = _.values(entityMap);

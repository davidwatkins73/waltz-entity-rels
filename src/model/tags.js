import _ from "lodash";

export const tagMap = {
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

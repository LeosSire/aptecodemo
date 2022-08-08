export interface Licence {
    "audienceSelection": boolean,
    "audiencePreview": boolean,
    "export": boolean,
    "advancedQuery": boolean,
    "cube": boolean,
    "profile": boolean,
    "dashboards": boolean,
    "dashboardsPareto": boolean,
    "campaignSingleStep": boolean,
    "campaignOrbitOverview": boolean,
    "campaignCustomisedDataDelivery": boolean,
    "bundles": bundle[]
}

export interface bundle {
    "id": number,
    "name": string,
    "instanceName": string
}

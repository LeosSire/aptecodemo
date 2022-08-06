export interface Dimensions {
    id: string,
    type: string,
    variableName: string,
    banding: Banding | undefined,
}

export interface Banding {
    type: string;
}
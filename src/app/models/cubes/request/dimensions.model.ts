export interface Dimension {
    id: string,
    type: string,
    variableName: string,
    banding: Banding | undefined,
}

export interface Banding {
    type: string;
}
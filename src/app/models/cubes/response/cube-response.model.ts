export interface CubeResponse {
    title: string;
    notes: string;
    ranSuccessfully: string;
    systemName: string;
    systemLoadDate: string;
    userName: string;
    queryDescription: string;
    dimensionResults: DimensionResult[];
    measureResults: MeasureResult[];
    counts: Count[];
}

export interface DimensionResult {
 id: string;
 headerCodes: string;
 headerDescription: string;   
}

export interface MeasureResult {
    id: string;
    rows: string;
    cells: string;
}

export interface Count {
    tableName: string;
    countValue: number;
}
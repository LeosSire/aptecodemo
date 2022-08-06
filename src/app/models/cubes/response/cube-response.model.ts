import { Count } from "./count.model";
import { DimensionResult } from "./dimention-result.model";
import { MeasureResult } from "./measure-result.model";

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

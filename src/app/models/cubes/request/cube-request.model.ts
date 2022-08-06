import { Dimension } from "./dimensions.model"
import { Measure } from "./measures.model"
import { SelectionModel } from "./selection.model"

export interface CubeRequest {
  baseQuery: SelectionModel;
  resolveTableName: string;
  storage: string;
  leftJoin: boolean;
  dimensions: Dimension[];
  measures: Measure[];
  subTotals: string | number;
}

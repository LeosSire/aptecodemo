import { Dimensions } from "./dimensions.model"
import { Measures } from "./measures.model"

export interface CubeRequest {
  baseQuery: SelectionModel;
  resolveTableName: string;
  storage: string;
  leftJoin: boolean;
  dimensions: Dimensions[];
  measures: Measures[];
  subTotals: string | number;
}

export interface SelectionModel {
  selection: TableModel;
}

export interface TableModel {
  tableName: string;
}

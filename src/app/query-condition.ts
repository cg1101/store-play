import {Action} from '@ngrx/store';

// model
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface SegmentOption {

}


export interface QueryCondition {
  accountId: string;
  dateRange: DateRange;
  segmentOptions: SegmentOption[];
  sortKey: string;
  filter: string;
}

// initial state
export const initialState: QueryCondition = {
  accountId: null,
  dateRange: {
    startDate: new Date,
    endDate: new Date((new Date().getTime() - 7 * 24 * 3600 * 1000)),
  },
  segmentOptions: [],
  sortKey: null,
  filter: null,
};

// action
export class QueryConditionAction implements Action {
  readonly type = '[QueryCondition] Update';

  constructor(public payload: QueryCondition) {
  }
}

// reducer
export function queryConditionReducer(state: QueryCondition = initialState, action: QueryConditionAction): QueryCondition {
  return Object.assign({}, action.payload);
}


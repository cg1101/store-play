// counter.ts
import {Action} from '@ngrx/store';

// model is not needed for this native data type

// actions
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

// reducers, initialState is given as default value
export function counterReducer(state: number = 0, action: Action) {
  // console.log('I AM counter reducer');
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    case DECREMENT:
      return state - 1;

    case RESET:
      return 0;

    default:
      return state;
  }
}

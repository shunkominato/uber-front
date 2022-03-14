import React from 'react';
import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [] as any,
};

export const foodsTyps = {
  FETCHING: Symbol('FETCHING'),
  FETCH_SUCCESS: Symbol('FETCH_SUCCESS'),
};

export type foodsActionTyps = {
  type: typeof foodsTyps[keyof typeof foodsTyps];
  payload?: {
    foods: [];
  };
};

export const foodsReducer: React.Reducer<
  {
    fetchState: string;
    foodsList: any;
  },
  foodsActionTyps
> = (state, action) => {
  switch (action.type) {
    case foodsTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload?.foods,
      };
    default:
      throw new Error();
  }
};

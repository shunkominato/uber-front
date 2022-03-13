import React from 'react';
import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: [] as any,
};

export const restaurantsTypes = {
  FETCHING: Symbol('FETCHING'),
  FETCH_SUCCESS: Symbol('FETCH_SUCCESS'),
};

export type restaurantsActionTypes = {
  type: typeof restaurantsTypes[keyof typeof restaurantsTypes];
  payload?: {
    restaurants: [];
  };
};

export const restaurantsReducer: React.Reducer<
  {
    fetchState: string;
    restaurantsList: any;
  },
  restaurantsActionTypes
> = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload?.restaurants,
      };
    default:
      throw new Error();
  }
};

import axios from 'axios';
import { foodsIndex } from '../urls/index';

export const fetchFoods = async (restaurantId: string) => {
  try {
    const res = await axios.get(foodsIndex(restaurantId));
    return res;
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

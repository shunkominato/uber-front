import axios from 'axios';
import { restaurantsIndex } from '../urls/index';

export const fetchRestaurants = async () => {
  try {
    const res = await axios.get(restaurantsIndex);
    return res;
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

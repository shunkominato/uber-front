import axios from 'axios';
import { lineFoods, lineFoodsReplace } from '../urls/index';

export const postLineFoods = async (params: any) => {
  try {
    const res = await axios.post(lineFoods, {
      food_id: params.foodId,
      count: params.count,
    });
    return res;
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

export const replaceLineFoods = async (params: any) => {
  try {
    const res = await axios.put(lineFoodsReplace, {
      food_id: params.foodId,
      count: params.count,
    });
    return res;
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

export const fetchLineFoods = () => {
  return axios
    .get(lineFoods)
    .then((res) => {
      console.log('------------');
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};

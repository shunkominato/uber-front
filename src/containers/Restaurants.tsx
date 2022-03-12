import React, { useEffect } from 'react';
import { fetchRestaurants } from '../apis/restaurants';

export const Restaurants = () => {
  useEffect(() => {
    async function asyncLoadData() {
      try {
        const aa = await fetchRestaurants();
        console.log(aa);
      } catch {
        console.log('err');
      }
    }
    asyncLoadData();
  }, []);
  return <>レストラン一覧</>;
};

import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import { fetchFoods } from '../apis/foods';
import { COLORS } from '../styleConstants';
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import {
  initialState as foodsInitialState,
  foodsTyps,
  foodsReducer,
} from '../reducers/foods';
import { REQUEST_STATE } from '../constants';
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods: React.VFC<{ match: any }> = ({ match }: { match: any }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  useEffect(() => {
    async function asyncLoadData() {
      try {
        dispatch({ type: foodsTyps.FETCHING });
        const { data } = await fetchFoods(match.params.restaurantsId);
        dispatch({
          type: foodsTyps.FETCH_SUCCESS,
          payload: {
            foods: data.foods,
          },
        });
        console.log(data);
      } catch {
        console.log('err');
      }
    }
    asyncLoadData();
  }, []);
  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </>
        ) : (
          foodsState.foodsList.map((food: any) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(foods: any) => console.log(foods)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
    </>
  );
};

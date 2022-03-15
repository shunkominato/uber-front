import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link, useHistory } from 'react-router-dom';
import { NewOrderConfirmDialog } from '../components/NewOrderConfirmDialog';
import { postLineFoods, replaceLineFoods } from '../apis/lineFoods';
import { REQUEST_STATE } from '../constants';
import { fetchFoods } from '../apis/foods';
import { COLORS } from '../styleConstants';
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import {
  initialState as foodsInitialState,
  foodsTyps,
  foodsReducer,
} from '../reducers/foods';

import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

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
  const history = useHistory();
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: { id: null },
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingResutaurautName: '',
    newResutaurautName: '',
  };
  const [state, setState] = useState(initialState);

  const submitOrder = () => {
    postLineFoods({
      foodId: state.selectedFood?.id,
      count: state.selectedFoodCount,
    })
      .then(() => history.push('/orders'))
      .catch((e) => {
        console.log(e);
        // if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
        //   setState({
        //     ...state,
        //     isOpenOrderDialog: false,
        //     isOpenNewOrderDialog: true,
        //     existingResutaurautName: e.response.data.existing_restaurant,
        //     newResutaurautName: e.response.data.new_restaurant,
        //   });
        // } else {
        //   throw e;
        // }
      });
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => history.push('/orders'));
  };
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
                onClickFoodWrapper={(foodDetail: any) =>
                  setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: foodDetail,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          // 先ほど作った関数を渡します
          onClickOrder={() => submitOrder()}
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: { id: null },
              selectedFoodCount: 1,
            })
          }
        />
      )}
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingResutaurautName={state.existingResutaurautName}
          newResutaurautName={state.newResutaurautName}
          onClickSubmit={() => replaceOrder()}
        />
      )}
    </>
  );
};

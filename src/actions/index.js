export const REQUEST_POLONIEX_DATA='REQUEST_POLONIEX_DATA';
export const RECEIVE_POLONIEX_DATA='RECEIVE_POLONIEX_DATA';
export const REQUEST_POLONIEX_DATA_FAILED='REQUEST_POLONIEX_DATA_FAILED';
export const RECEIVE_CURRENT_ROUTE='RECEIVE_CURRENT_ROUTE';

const requestPoloniexData=() => {
  return {
    type: REQUEST_POLONIEX_DATA
  };
};

const receivePoloniexData=(data) => {
  return {
    type: RECEIVE_POLONIEX_DATA,
    data
  };
};

const requestPoloniexDataFailed=(error) => {
  return {
    type: REQUEST_POLONIEX_DATA_FAILED,
    error
  };
};

const receiveCurrentRoute=(activeScreen) => {
  return {
    type: RECEIVE_CURRENT_ROUTE,
    activeScreen
  };
}

export const fetchPoloniexData=() => {
  const url=`https://poloniex.com/public?command=returnTicker`;

  return async (dispatch) => {
    dispatch(requestPoloniexData());

    try {
      const response=await fetch(url);
      const json=await response.json();

      let objectResponseResultsPoloniexData={
        ...json
      };

      dispatch(receivePoloniexData(objectResponseResultsPoloniexData));
    } catch(error) {
      dispatch(requestPoloniexDataFailed(error));
    }
  };
};

export const emitActiveScreen=(activeScreen) => {
  return (dispatch) => {
    dispatch(receiveCurrentRoute(activeScreen));
  };
};

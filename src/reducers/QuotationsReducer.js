import {
  REQUEST_POLONIEX_DATA,
  RECEIVE_POLONIEX_DATA,
  REQUEST_POLONIEX_DATA_FAILED,
  RECEIVE_CURRENT_ROUTE
} from '../actions';

const initialState={
  tableHeader: ['Currency pair', 'Last trade price', 'Highest bid', 'Percent change'],
  tableName: [],
  tableData: [],
  poloniexData: '',
  loadingData: false,
  firstRender: true,
  errorPoloniexData: [],
  activeScreen: 'AboutScreen'
};

const quotationsReducer=(state=initialState, action) => {
  switch(action.type) {
    case REQUEST_POLONIEX_DATA:
      return {
        ...state,
        loadingData: true
      };

    case RECEIVE_POLONIEX_DATA:
      let tableName=Object.keys(action.data);
      let tableData;

      if (!state.firstRender && (JSON.stringify(state.poloniexData) != JSON.stringify(action.data))) {
        tableData=tableName.map((item, index) => {
          if (parseFloat(action.data[item].last) !== parseFloat(state.poloniexData[item].last)) {
            action.data[item].last=`${action.data[item].last}, animate`;
          }

          if (parseFloat(action.data[item].highestBid) !== parseFloat(state.poloniexData[item].highestBid)) {
            action.data[item].highestBid=`${action.data[item].highestBid}, animate`;
          }

          if (parseFloat(action.data[item].percentChange) !== parseFloat(state.poloniexData[item].percentChange)) {
            action.data[item].percentChange=`${action.data[item].percentChange}, animate`;
          }

          return [action.data[item].last, action.data[item].highestBid, action.data[item].percentChange];
        });
      } else if (state.firstRender) {
        tableData=tableName.map((item, index) => {
          return [action.data[item].last, action.data[item].highestBid, action.data[item].percentChange];
        });
      }

      return {
        ...state,
        poloniexData: action.data,
        tableName,
        tableData: tableData ? tableData : state.tableData,
        firstRender: false,
        loadingData: false
      };

    case REQUEST_POLONIEX_DATA_FAILED:
        let error=[`Произошла ошибка: ${action.error}`];

        return {
          ...state,
          errorPoloniexData: error,
          loadingData: false
        };

    case RECEIVE_CURRENT_ROUTE:
      return {
        ...state,
        activeScreen: action.activeScreen
      };

    default:
      return state;
  }
};

export default quotationsReducer;

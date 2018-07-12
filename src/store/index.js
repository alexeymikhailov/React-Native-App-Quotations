import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import QuotationsReducer from '../reducers/QuotationsReducer';

const rootReducer=combineReducers({
  QuotationsReducer
});

const configureStore=() => {
  let store=createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

  return store;
};

export default configureStore;

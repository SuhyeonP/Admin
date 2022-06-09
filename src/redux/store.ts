import { Action, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
// import rootSaga from './saga';
import { globalReducer } from '~/src/redux/slice';

const rootReducer = combineReducers({
  global: globalReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      sagaMiddleware,
      routerMiddleware(history),
    ),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Khai báo lưu trữ cục bộ
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import permissionReducer from '~/reducer/Permission';
import stateTuyenTauReduce from '~/reducer/State';
const reducer = combineReducers({
  permission: permissionReducer,
  stateTuyenTau: stateTuyenTauReduce,
});

export default configureStore({
  reducer: reducer,
});

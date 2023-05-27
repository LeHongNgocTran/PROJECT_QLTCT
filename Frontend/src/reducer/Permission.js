import { createSlice } from '@reduxjs/toolkit';

const permissionSlice = createSlice({
  name: 'permission',
  initialState: {
    users: [],
    loggedInUser: false,
  },
  reducers: {
    login(state, actions) {
      state.users = actions.payload;
      state.loggedInUser = true;
    },
    logout(state, actions) {
      state.users = {};
      state.loggedInUser = false;
    },
  },
});

export const { login, logout } = permissionSlice.actions;

export default permissionSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        userData : [],
        allUsers:[]

  };
  const inputSlice = createSlice({
    name: 'UserData',
    initialState,
    reducers: {
      setUserData: (state, action) => {
        state.userData= action.payload;
      },
      setAllUsers: (state, action) => {
        state.allUsers= action.payload;
      },
      
    },
  });
  
  export const { setUserData , setAllUsers } = inputSlice.actions;
  export default inputSlice.reducer;
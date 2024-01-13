import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        userData : [],
        allUsers:[],
        searchResult:'',

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
      setSearch: (state, action) => {
        state.searchResult= action.payload;
      },
      
    },
  });
  
  export const { setUserData , setAllUsers , setSearch} = inputSlice.actions;
  export default inputSlice.reducer;
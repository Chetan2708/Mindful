import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        userData : [],
        allUsers:[],
        searchResult:'',
        temp:null,
        val:'',

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
      setTemp: (state, action) => {
        state.temp= action.payload;
      },
      setVal: (state, action) => {
        state.val= action.payload;
      },
  
      
    },
  });
  
  export const { setUserData , setAllUsers , setSearch, setTemp , setVal} = inputSlice.actions;
  export default inputSlice.reducer;
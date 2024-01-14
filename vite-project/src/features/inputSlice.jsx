import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        userData : [],
        allUsers:[],
        searchResult:'',
        selectedOption:'A-Z',

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
      setSelectedOption: (state, action) => {
        state.selectedOption= action.payload;
      },
      
    },
  });
  
  export const { setUserData , setAllUsers , setSearch , setSelectedOption} = inputSlice.actions;
  export default inputSlice.reducer;
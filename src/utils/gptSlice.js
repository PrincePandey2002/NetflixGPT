import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        movieResults:null,
        movieNames:null
    },
    reducers:{
        toogleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGptMovieResults:(state,action)=>{
            const {movieNames,movieResults}=action.payload;
            state.gptMovies=action.payload;
            state.movieNames=movieNames;
            state.movieResults=movieResults;
        },
    },
});

export const {toogleGptSearchView,addGptMovieResults}=gptSlice.actions;
export default gptSlice.reducer;
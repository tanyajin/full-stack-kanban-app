import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import boardReducer from './features/boardSlice'
import markedReducer from "./features/markedSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        board:boardReducer,
        allMarked:markedReducer
    }
})
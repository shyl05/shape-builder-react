import { configureStore } from '@reduxjs/toolkit'
import { ShapesSlice } from './Slices/ShapesSlice'
import {setupListeners} from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    shapes: ShapesSlice.reducer,
  },
})

setupListeners(store.dispatch);

export default store;
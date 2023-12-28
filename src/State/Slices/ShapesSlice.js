import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shapes: [],
    selectedShape: {},
};

export const ShapesSlice = createSlice({
  name: 'shapes',
  initialState,
  reducers: {
    loadShapes: (state, action) => {
        state.shapes = [...state.shapes, action.payload];
    },
    updateShapes: (state, action) => {
        state.shapes.map(item => {
            let obj = {};
            if (item.name === action.payload.name) {
                obj = {...action.payload}
                obj.type = item.type
            } else {
                obj = {...item}
            }
            return obj
        });
    },
    getSelectedShape: (state, action) => {
        state.selectedShape = Object.assign((state.selectedShape,action.payload));
    },
  },
})

export const { loadShapes, getSelectedShape, updateShapes } = ShapesSlice.actions
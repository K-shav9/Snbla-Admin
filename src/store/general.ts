import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  loading: boolean;
  isLoading?: boolean;
};

export const initialAuthState: GeneralState = {
  loading: false,
  isLoading: false,
};

const slice = createSlice({
  name: "General",
  initialState: initialAuthState,
  reducers: {
    handleLoading: (state: any, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    handleIsLoading: (state: any, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});


const { reducer } = slice;

export const { handleLoading, handleIsLoading } = slice.actions;

export default reducer;

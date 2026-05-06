import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type BusinessState = {
  payData: any
  error: string | null;
};

export const initialBusinessState: BusinessState = {
  payData: {
    pickGoal: null,
    selectedGoal: null,
    pack: null,
    scheduleValues: {},
    amounts: {
      amount: null,
      baseEarnings: null,
    },
    snbla_trans_id: null,
    snbla_order_id: null
  },
  error: null,
};

const businessSlice = createSlice({
  name: "merchant",
  initialState: initialBusinessState,
  reducers: {
    storePickGoal: (state, action: PayloadAction<any>) => {
      state.payData.pickGoal = action.payload;
      state.error = null;
    },
    storeAmount: (state, action: PayloadAction<any>) => {
      state.payData.amounts.amount = action.payload?.amount;
      state.payData.amounts.baseEarnings = action.payload?.baseEarnings;
      state.error = null;
    },
    storeSelectedGoal: (state, action: PayloadAction<any>) => {
      state.payData.selectedGoal = action.payload;
      state.error = null;
    },
    storeScheduleValues: (state, action: PayloadAction<any>) => {
      state.payData.scheduleValues = action.payload;
      state.error = null;
    },
    storePack: (state, action: PayloadAction<any>) => {
      console.log("action", action.payload);

      // Ensure state.payData is initialized
      if (!state.payData) {
        console.warn("payData was null! Initializing now.");
        state.payData = { pack: {}, ...initialBusinessState.payData };
      }

      // Now safely assign pack
      state.payData.pack = action.payload;
      state.error = null;

      console.log("state.payData.pack", state.payData.pack);
    },

    storeTransactionDetails: (state, action: PayloadAction<any>) => {
      state.payData.snbla_trans_id = action.payload.snbla_trans_id;
      state.payData.snbla_order_id = action.payload.snbla_order_id;

      state.error = null;
    },

    // storePayDataFailed: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    // },
    resetPayData: (state) => {
      state.payData = null;
      state.error = null;
    },
  },
});

const { reducer } = businessSlice;

export const { storePickGoal, storeAmount, storeTransactionDetails, storeSelectedGoal, storeScheduleValues, storePack, resetPayData } = businessSlice.actions;

export default reducer;

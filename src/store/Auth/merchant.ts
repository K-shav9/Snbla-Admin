import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BusinessData = {
  businessName: string;
  businessEmail: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  description: string;
  category: string;
  isAdmin: boolean;
  isActive: boolean;
  website: string;
  whichBestDescribesYou: string;
  commercialRegistrationNumber: string;
  ibanNumber: string;
  unifiedNumber: string;
  vatNumber: string;
  brandLogo: File | null;
  bankCertificate: File | null;
  crCertificate: File | null;
  delegationLetter: File | null;
  vatCertificate: File | null;
  defaultTabKey: string;
};

export type BusinessState = {
  createMerchantData: BusinessData | null;
  merchantPlan: any;
  error: string | null;
};

export const initialBusinessState: BusinessState = {
  merchantPlan: null,
  createMerchantData: null,
  error: null,
};

const businessSlice = createSlice({
  name: "merchant",
  initialState: initialBusinessState,
  reducers: {
    createMerchantSuccess: (state, action: PayloadAction<BusinessData>) => {
      state.createMerchantData = action.payload;
      state.error = null;
    },
    createMerchantFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetCreateMerchantData: (state) => {
      state.createMerchantData = null;
      state.error = null;
    },
    storeMerchantPlan: (state, action: PayloadAction<any>) => {
      state.merchantPlan = action.payload;
      state.error = null;
    },
    resetMerchantPlan: (state) => {
      state.merchantPlan = null;
      state.error = null;
    },
  },
});

const { reducer } = businessSlice;

export const { createMerchantSuccess, resetMerchantPlan, createMerchantFailed, storeMerchantPlan, resetCreateMerchantData } = businessSlice.actions;

export default reducer;

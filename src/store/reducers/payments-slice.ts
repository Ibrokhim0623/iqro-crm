import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IPayment {
  paymentVisible: {
    open: boolean;
  };
}

const initialState: IPayment = {
  paymentVisible: {
    open: false,
  },
};

export const PaymentsSlice = createSlice({
  name: "payments-slice",
  initialState,
  reducers: {
    setPaymentVisible: (state, action: PayloadAction<boolean>) => {
      state.paymentVisible.open = action.payload;
    },
  },
});

export const { setPaymentVisible } = PaymentsSlice.actions;
export default PaymentsSlice.reducer;

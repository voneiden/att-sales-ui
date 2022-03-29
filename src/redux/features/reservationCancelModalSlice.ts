import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApartmentReservationWithCustomer, Project } from '../../types';

interface ReservationCancelModalContent {
  reservation: ApartmentReservationWithCustomer;
  ownershipType: Project['ownership_type'];
}

interface ReservationCancelModalState {
  isOpened: boolean;
  content?: ReservationCancelModalContent;
}

const initialState: ReservationCancelModalState = {
  isOpened: false,
  content: undefined,
};

const reservationCancelModalSlice = createSlice({
  name: 'reservationCancelModal',
  initialState: initialState,
  reducers: {
    showReservationCancelModal: (state, action: PayloadAction<ReservationCancelModalContent>) => {
      state.isOpened = true;
      state.content = action.payload;
    },
    hideReservationCancelModal: (state) => {
      state.isOpened = false;
      state.content = undefined;
    },
  },
});

export const { showReservationCancelModal, hideReservationCancelModal } = reservationCancelModalSlice.actions;

export default reservationCancelModalSlice.reducer;

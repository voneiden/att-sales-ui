import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Apartment, ApartmentReservation, ApartmentReservationCustomer, ApartmentRevaluationWithId } from '../../types';

interface ApartmentRevaluationModalContent {
  customer: ApartmentReservationCustomer;
  reservationId: ApartmentReservation['id'];
  revaluation?: ApartmentRevaluationWithId;
  apartmentId: Apartment['uuid'];
}

interface ApartmentRevaluationModalState {
  isOpened: boolean;
  content?: ApartmentRevaluationModalContent;
}

const initialState: ApartmentRevaluationModalState = {
  isOpened: false,
  content: undefined,
};

const apartmentRevaluationModalSlice = createSlice({
  name: 'apartmentRevaluationModal',
  initialState: initialState,
  reducers: {
    showApartmentRevaluationModal: (state, action: PayloadAction<ApartmentRevaluationModalContent>) => {
      state.isOpened = true;
      state.content = action.payload;
    },
    hideApartmentRevaluationModal: (state) => {
      state.isOpened = false;
      state.content = undefined;
    },
  },
});

export const { showApartmentRevaluationModal, hideApartmentRevaluationModal } = apartmentRevaluationModalSlice.actions;

export default apartmentRevaluationModalSlice.reducer;

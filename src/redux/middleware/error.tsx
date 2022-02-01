import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from '../../components/common/errorToast/ErrorToastManager';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorTitle = action.error.message;
    const errorDetail =
      action.payload?.data?.detail ||
      action.payload?.data?.message ||
      action.payload?.data[0]?.message ||
      action.payload?.data;

    toast.show({ type: 'error', title: errorTitle, content: errorDetail });
  }

  return next(action);
};

import axios from 'axios';
// import { useSelector } from 'react-redux';

import getApiBaseUrl from './getApiBaseUrl';
// import { RootState } from '../redux/store';

export const useFileDownloadApi = (url: string) => {
  const apiBaseUrl = getApiBaseUrl();
  // const apiToken = useSelector((state: RootState) => state.tokens.apiToken);

  return () =>
    axios.get(`${apiBaseUrl}${url}`, {
      responseType: 'blob',
      headers: {
        // TODO: auth token in headers
        // Authorization: `Bearer ${apiToken}`,
      },
    });
};

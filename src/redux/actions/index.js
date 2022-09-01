import apiCurrencyFetch from '../../services/api';

export const SET_WALLET = 'SET_WALLET';
export const EMAIL = 'EMAIL';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAIL = 'API_FAIL';

export const setLogin = (payload) => ({ type: EMAIL, payload });

const apiRequest = () => ({ type: API_REQUEST });

const apiSuccess = (payload) => ({ type: API_SUCCESS, payload });

const apiFail = (error) => ({ type: API_FAIL, payload: { error } });

export const fetchCurrencyAPI = () => (
  async (dispatch) => {
    dispatch(apiRequest());
    try {
      const currencies = await apiCurrencyFetch();
      dispatch(apiSuccess(currencies));
    } catch (error) {
      dispatch(apiFail(error));
    }
  }
);

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_REQUEST, API_SUCCESS, API_FAIL, EXCHANGE_RATE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXCHANGE_RATE:
    return {
      ...state,
      isFetching: false,
      error: '',
      expenses: [
        ...state.expenses,
        { id: state.expenses.length,
          ...action.payload },
      ],
    };
  case API_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case API_SUCCESS:
    return {
      ...state,
      currencies: action.payload.currencies,
      isFetching: false,
      error: '',
    };
  case API_FAIL:
    return {
      ...state,
      isFetching: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default walletReducer;

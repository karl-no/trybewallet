const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const apiCurrencyFetch = async () => {
  try {
    const moedas = await getCurrencies();
    const keys = Object.keys(moedas);
    const currencies = keys.filter((key) => key !== 'USDT');
    return { currencies };
  } catch (error) {
    return error;
  }
};

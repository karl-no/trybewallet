import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { expenses, idToEdit } = this.props;
    const expenseToEdit = expenses[idToEdit];
    this.setState({
      value: expenseToEdit.value,
      description: expenseToEdit.description,
      currency: expenseToEdit.currency,
      method: expenseToEdit.method,
      tag: expenseToEdit.tag,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onClickButton = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(updateExpense(this.state));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;

    const { currencies } = this.props;

    const currenciesKeys = currencies.map((money) => (
      <option key={ money } value={ money }>{ money }</option>
    ));

    return (
      <form>
        <input
          placeholder="Valor da despesa"
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />

        <input
          placeholder="Descrição"
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currenciesKeys }
          </select>
        </label>

        <label htmlFor="method">
          Pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="submit"
          onClick={ this.onClickButton }
        >
          Editar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
